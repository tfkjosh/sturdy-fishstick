import seoFragment from "./seo";

export const collectionFragment = /* GraphQl */ `
    fragment collection on Collection {
        handle
        title
        description
        seo {
            ...seo
        }
        updatedAt
    }
    ${seoFragment}
`;