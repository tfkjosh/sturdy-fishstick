import { productFragment } from "../fragments/product";

export const getProductQuery = /* GraphQl */ `
    query getProducts(
        $sortKey: ProductSortKey, 
        $reverse: Boolean, 
        $query: String
    ) {
        products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
            edges {
                node {
                    ...product
                }
            }
        }
    }
        ${productFragment}
`;