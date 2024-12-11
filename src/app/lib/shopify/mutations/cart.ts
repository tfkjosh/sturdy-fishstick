import cartFragment from "../fragments/cart";

export const addToCartMutation = /* GraphQL */ `
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
                ...cart
            }
        }
    }
    ${cartFragment}
`;