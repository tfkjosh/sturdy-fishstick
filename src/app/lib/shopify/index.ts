import { 
    Cart,
    Collection,
    Connection, 
    Image, 
    Menu, 
    Product, 
    ShopifyAddToCartOperation, 
    ShopifyCart, 
    ShopifyCartOperation, 
    ShopifyCollection, 
    ShopifyCollectionProductsOperation, 
    ShopifyCollectionsOperation, 
    ShopifyMenuOperation, 
    ShopifyProduct, 
    ShopifyProductOperation, 
    ShopifyProductRecommendationsOperation, 
    ShopifyProductsOperation 
} from "./types";
import { getMenuQuery } from "./queries/menu";
import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "../constants";
import { ensureStartWith } from "../utils";
import { isShopifyError } from "../type-guards";
import { getProductQuery, getProductRecommendationsQuery } from "./queries/product";
import { getCollectionProductsQuery, getCollectionsQuery } from "./queries/collection";
import { addToCartMutation } from "./mutations/cart";
import { getCartQuery } from "./queries/cart";

const domain = process.env.SHOPIFY_STORE_DOMAIN
    ? ensureStartWith(process.env.SHOPIFY_STORE_DOMAIN, "https://") 
    : "";

const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`

const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

type ExtractVariables<T> = T extends {variables: object} 
    ? T["variables"]
    : never;

export async function shopifyFetch<T>({
    cache = 'force-cache',
    headers,
    query,
    tags,
    variables,
}: {
    cache?: RequestCache;
    headers?: HeadersInit;
    query: string,
    tags?: string[],
    variables?: ExtractVariables<T>;
}): Promise<{status: number; body: T} | never > {
    try {
        const result = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": key,
                ...headers,
            },
            body: JSON.stringify({
                ...(query && {query}),
                ...(variables && {variables}),
            }),
            cache,
            ...(tags && {next: {tags}}),
        });

        const body = await result.json();
        if (body.errors) {
            throw body.errors[0];
        }

        return {
            status: result.status,
            body,
        }
    } catch (error) {
        if (isShopifyError(error)) {
            throw {
                cause: error.cause?.toString() || 'unknown',
                status: error.status || 500,
                message: error.message,
                query, 
            };
        }

        throw {
            error,
            query,
        }
    }
}

function removeEdgesAndNodes<T>(array: Connection<T>): T[] {
    return array.edges.map((edge) => edge?.node)
}

function reshapeImages(images: Connection<Image>, productTitle: string) {
    const flattened = removeEdgesAndNodes(images);

    return flattened.map((image) => {
        const filename = image.url.match(/.*\/(.*)\..*/)?.[1];

        return {
            ...image,
            altText: image.altText || `${productTitle} - ${filename}`,
        }
    })
}

function reshapeProduct(
    product: ShopifyProduct, 
    filterHiddenProducts: boolean = true
) {
    if(
        !product || 
        (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
    ) {
        return undefined;
    }
    const {images, variants, ...rest} = product;

    return {
        ...rest,
        images: reshapeImages(images, product.title),
        variants: removeEdgesAndNodes(variants),
    }
}

function reshapeProducts(products: ShopifyProduct[]) {
    const reshapedProducts = [];
  
    for (const product of products) {
      if (product) {
        const reshapedProduct = reshapeProduct(product);
  
        if (reshapedProduct) {
          reshapedProducts.push(reshapedProduct);
        }
      }
    }
  
    return reshapedProducts;
  }

export async function getMenu(handle: string): Promise<Menu[]> {
    const res = await shopifyFetch<ShopifyMenuOperation>({
        query: getMenuQuery,
        tags: [TAGS.collections],
        variables: {
            handle,
        },
    });

    return (
        res.body?.data?.menu?.items.map(
        (item: {title: string, url: string}) => ({
            title: item.title, 
            path: item.url
            .replace(domain, "")
            .replace("/collections", "/search")
            .replace("/pages", ""),
        })) || []
    );
}

export async function getProducts({
    query, 
    reverse, 
    sortKey
}: {
    query?: string; 
    reverse?: boolean;
    sortKey?: string;
}): Promise<Product[]> {
    const res = await shopifyFetch<ShopifyProductsOperation> ({
        query: getProductQuery,
        tags: [TAGS.products],
        variables: {
            query,
            reverse,
            sortKey,
        }
    });

    return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

function reshapeCollection(
    collection: ShopifyCollection
): Collection | undefined {
    if(!collection) return undefined;

    return {
        ...collection,
        path: `/search/${collection.handle}`
    };
}

function reshapeCollections(collections: ShopifyCollection[]) {
    const reshapedCollections = [];

    for (const collection of collections) {
        if(collection) {
            const reshapedCollection = reshapeCollection(collection);

            if(reshapedCollection) {
                reshapedCollections.push(reshapedCollection);
            }
        }
    }

    return reshapedCollections;
}

export async function getCollections(): Promise<Collection[]> {
    const res = await shopifyFetch<ShopifyCollectionsOperation>({
        query: getCollectionsQuery,
        tags: [TAGS.collections]
    });

    const ShopifyCollections = removeEdgesAndNodes(res?.body?.data?.collections);
    const collections = [
        {
            handle: "",
            title: "All",
            description: "All products",
            seo: {
                title: "All",
                description: "All products"
            },
            path: "/search",
            updatedAt: new Date().toISOString(),
        },
        // Filter out the hidden products
        ...reshapeCollections(ShopifyCollections).filter(
            (collection) => !collection.handle.startsWith("hidden")
        ),
    ];

    return collections;
}

export async function getCollectionProducts({
    collection, 
    reverse, 
    sortKey
}: {
    collection: string;
    reverse?: boolean;
    sortKey?: string;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
        handle: collection,
        reverse,
        sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
    }
  });
  
  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }
  
  return reshapeProducts(
        removeEdgesAndNodes(res.body.data.collection.products)
    );
}

export async function getProduct(handle:string): Promise<Product | undefined> {
    const res = await shopifyFetch<ShopifyProductOperation>({
        query: getProductQuery,
        tags: [TAGS.products],
        variables: {
            handle,
        },
    });
    console.log("getProduct", res.body.data.product);
    return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(
    productId: string
): Promise<Product[]> {
    const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
        query: getProductRecommendationsQuery,
        tags: [TAGS.products],
        variables: {
            productId,
        },
    });

    return reshapeProducts(res.body.data.productRecommendations);
}

function reshapeCart(cart: ShopifyCart): Cart {
    if(!cart.cost?.totalTaxAmount) {
        cart.cost.totalTaxAmount = {
            amount: "0.0",
            currencyCode: "USD",
        };
    }

    return {
        ...cart,
        lines: removeEdgesAndNodes(cart.lines)
    };
}

export async function addToCart(
    cartId: string, 
    lines: { merchandiseId: string; quantity: number}[]
): Promise<Cart> {
    const res = await shopifyFetch<ShopifyAddToCartOperation>({
        query: addToCartMutation,
        variables: {
            cartId,
            lines,
        },
        cache: "no-cache",
    });

    return reshapeCart(res.body.data.cartLinesAdd.cart)
}

export async function getCart(
    cartId: string | undefined
): Promise<Cart | undefined> {
    if(!cartId) {
        return undefined;
    }

    const res = shopifyFetch<ShopifyCartOperation>({
        query: getCartQuery,
        variables: { cartId },
        tags: [TAGS.cart]
    })
}