export type Menu = {
    title: string,
    path: string,

};

export type ShopifyMenuOperation = {
    data: {
        menu?: {
            items: {
                title: string,
                url: string;
            }[];
        };
    };
    variables: {
        handle: string;
    };
};

export type Money = {
    title: string;
    path: string;
};

export type ProductOption = {
    id: string,
    name: string,
    values: string[];
};

export type Edge<T> = {
    node: T;
}

export type Connection<T> = {
    edges: Array<Edge<T>>;
};

export type ProductVariant = {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: {
        name: string;
        value: string;
    }[];
    price: Money;
};

export type Image = {
    url: string;
    altText: string;
    width: number;
    height: number;
};

export type SEO = {
    title: string,
    description: string;
};

export type ShopifyProduct = {
    id: string;
    handle: string;
    availableForSale: boolean;
    title: string;
    description: string;
    descriptionHtml: string;
    options: ProductOption[];
    priceRange: {
        maxVariantPrice: Money;
        minVariantPrice: Money;
    };
    variants: Connection<ProductVariant>;
    featuredImage: Image;
    images: Connection<Image>;
    seo: SEO;
    tags: string[];
    updatedAt: string;
};

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
    variants: ProductVariant[],
    images: Image[];
};

export type ShopifyProductsOperation = {
    data: {
        products: Connection<ShopifyProduct>;
    };
    variables: {
        query?: string;
        reverse?: boolean;
        sortKey?: string;
    }
};