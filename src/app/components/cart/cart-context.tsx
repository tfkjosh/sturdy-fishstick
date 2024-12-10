import { Cart, Product, ProductVariant } from "@/app/lib/shopify/types";
import { createContext, useContext } from "react";

type UpdateType = "plus" | "minus" | "delete";

type CartContextType = {
    cart: Cart | undefined;
    updateCartItem: (merchandiseId: string, updateType: UpdateType) => void;
    addCartItem: (variant: ProductVariant, product: Product) => void;

};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
    const context = useContext(CartContext);

    if(context === undefined) {
        throw new Error("useCart must be used within a CartProvider");

    };

    return context;
};