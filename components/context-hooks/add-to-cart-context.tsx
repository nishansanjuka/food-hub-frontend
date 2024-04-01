"use client";
import React from "react";
import { boolean, promise } from "zod";

const AddToCart = React.createContext<boolean>(false);

const AddToCartUpdateContext = React.createContext<React.Dispatch<React.SetStateAction<boolean>>>(() => {});


export function useIsOpenCart() {
    return React.useContext(AddToCart);
}

export function useUpdateIsOpenCart() {
    return React.useContext(AddToCartUpdateContext);
}

export function CartFormProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState<boolean>(false);

  function setIsOpen() {
    setOpen(prev => !prev);
  }

  return (
    <AddToCart.Provider value={open}>
      <AddToCartUpdateContext.Provider value={setIsOpen}>
        {children}
      </AddToCartUpdateContext.Provider>
    </AddToCart.Provider>
  );
}
