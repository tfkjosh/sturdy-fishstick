export const getMenuQuery = /* GraphQl */ `
    query getMenu($handle: String!) {
        menu(handle: $handle) {
            items {
                title
                url
            }
        }
    }
`;