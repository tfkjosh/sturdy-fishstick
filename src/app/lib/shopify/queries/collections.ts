import { collectionFragment } from "../fragments/collection";

export const getCollectionsQuery = /* GraphQl */ `
    query getCollections {
        collections(first: 100, sortKey: TITLE) {
            edges {
                node {
                    ...collection
                }
            }
        }
    }
    ${collectionFragment}
`;