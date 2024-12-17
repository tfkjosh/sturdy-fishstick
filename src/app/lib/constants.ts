export const TAGS = {
    collections: 'collections',
    products: 'products',
    cart: 'cart',
};

export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2024-10/graphql.json'

export type SortFilterItem = {
    title: string;
    slug: string | null;
    sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
    reverse: boolean;
};

export const defaultSort: SortFilterItem = {
    title: "Relevance",
    slug: null,
    sortKey: "RELEVANCE",
    reverse: false,
};

export const sorting: SortFilterItem[] = [
    defaultSort,
    {
        title: 'Trending', 
        slug: 'trending-desc', 
        sortKey: 'BEST_SELLING', 
        reverse: false,
    }, //asc
    {
        title: 'Latest Arrivals', 
        slug: 'latest-desc', 
        sortKey: 'CREATED_AT', 
        reverse: true,
    },
    {
        title: 'Price Low to High', 
        slug: 'price-asc', 
        sortKey: 'PRICE', 
        reverse: false,
    }, //asc
    {
        title: 'Price High to Low', 
        slug: 'price-desc', 
        sortKey: 'PRICE', 
        reverse: true,
    }
];

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "Default Title";