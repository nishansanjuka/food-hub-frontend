"use client";
import { CheckoutCart, GetCart } from "@/app/_actions";
import React from "react";

const CartContext = React.createContext<CheckoutCart[] | null>(null);
const CartUpdateContext = React.createContext<() => Promise<void>>(() =>
  Promise.resolve()
);

export function useCart() {
    return React.useContext(CartContext);
}

export function useUpdateCart() {
    return React.useContext(CartUpdateContext);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<CheckoutCart[]>([]);

  async function getCartData() {
    setCart(await GetCart());
  }

  return (
    <CartContext.Provider value={cart}>
      <CartUpdateContext.Provider value={getCartData}>
        {children}
      </CartUpdateContext.Provider>
    </CartContext.Provider>
  );
}
