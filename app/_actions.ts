"use server";
import { z } from "zod";
import { bioformSchema } from "./you/personal-informations/bio-form";
import { cookies } from "next/headers";
import { deliveryformSchema } from "./you/delivery-informations/delivery-form";
import { cartFormSchema } from "./foods/cart-form";
import { sortCart } from "@/lib/handle-cart";
import { foods } from "@/constants/data";

export interface Cart {
  id : number,
  amount : number,
  option : "small" | "large"
}

export interface PopCart {
  name : string
  imgSrc : string
  cart : Cart
}

export async function setUserBio(user: z.infer<typeof bioformSchema>) {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 10);

  cookies().set({
    name: "user-bio",
    value: JSON.stringify(user),
    httpOnly: true,
    path: "/",
    expires,
  });
}

export async function setUserShippingInfo(
  user: z.infer<typeof deliveryformSchema>
) {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 10);

  cookies().set({
    name: "user-shipping",
    value: JSON.stringify(user),
    httpOnly: true,
    path: "/",
    expires,
  });
}

export async function getUserBio(): Promise<z.infer<
  typeof bioformSchema
> | null> {
  const data = cookies().get("user-bio");

  if (data) {
    return JSON.parse(data.value);
  } else {
    return null;
  }
}

export async function getUserShippingInfo(): Promise<z.infer<
  typeof deliveryformSchema
> | null> {
  const data = cookies().get("user-shipping");

  if (data) {
    return JSON.parse(data.value);
  } else {
    return null;
  }
}



export async function AddToCart(data : z.infer<typeof cartFormSchema>) {
  
  const existingCart = cookies().get("default-cart");

  const cartData :Cart = {
    id : parseInt(data.id),
    amount : parseInt(data.amount),
    option : data.option
  }

  const newCart = [...JSON.parse(existingCart?.value ? existingCart.value : '[]') , cartData];

  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 10);

  console.log(newCart);

  cookies().set({
    name: "default-cart",
    value: JSON.stringify(newCart),
    httpOnly: true,
    path: "/",
    expires,
  });
}


export async function GetCart() : Promise<PopCart[]> {
  
  const existingCart = cookies().get("default-cart");

  const sortedCart = sortCart(JSON.parse(existingCart?.value ? existingCart.value : '[]')); 

  if(sortedCart.length > 0) {
    const renders: PopCart[] = sortedCart.map((cart) => {
      const matchingFood = foods.find((food) => food.id === cart.id);
      if (matchingFood) {
          return {
              cart: cart,
              name: matchingFood.name,
              imgSrc: matchingFood.imageSrc
          };
      } else {
          return null; // Or handle the case where there's no matching food
      }
  }).filter((render) => render !== null) as PopCart[];

    return renders;
  }

  
  return [];

}
