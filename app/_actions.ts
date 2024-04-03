"use server";
import { z } from "zod";
import { bioformSchema } from "./you/personal-informations/bio-form";
import { cookies } from "next/headers";
import { deliveryformSchema } from "./you/delivery-informations/delivery-form";
import { cartFormSchema } from "./foods/cart-form";
import { sortCart } from "@/lib/handle-cart";
import { foods } from "@/constants/data";
import { redirect } from "next/navigation";
import { checkoutFormSchema } from "@/components/checkout-form";

export interface Cart {
  id: number;
  amount: number;
  option: "small" | "large";
}

export interface CheckoutCart {
  name: string;
  imgSrc: string;
  price: number;
  additionPrice: number;
  cart: Cart;
}


export interface DeliveryInfo {
  client_name : string;
  address : string;
  nearest_place : string;
  phone_number : string;
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

export async function AddToCart(data: z.infer<typeof cartFormSchema>) {
  const existingCart = cookies().get("default-cart");

  const cartData: Cart = {
    id: parseInt(data.id),
    amount: parseInt(data.amount),
    option: data.option,
  };

  const newCart = [
    ...JSON.parse(existingCart?.value ? existingCart.value : "[]"),
    cartData,
  ];

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

export async function GetCart(): Promise<CheckoutCart[]> {
  const existingCart = cookies().get("default-cart");

  const sortedCart = sortCart(
    JSON.parse(existingCart?.value ? existingCart.value : "[]")
  );

  if (sortedCart.length > 0) {
    const renders: CheckoutCart[] = sortedCart
      .map((cart) => {
        const matchingFood = foods.find((food) => food.id === cart.id);
        if (matchingFood) {
          return {
            cart: cart,
            name: matchingFood.name,
            imgSrc: matchingFood.imageSrc,
            price: matchingFood.price,
            additionPrice: matchingFood.additionPrice,
          } as CheckoutCart;
        } else {
          return null; // Or handle the case where there's no matching food
        }
      })
      .filter((render) => render !== null) as CheckoutCart[];

    return renders;
  }

  return [];
}


export async function updateCart(cartId: number, cartOption: "small" | "large", newAmount: number) {

  
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 10);

  const existingCart = cookies().get("default-cart");

  const sortedCart : Cart[] = sortCart(
    JSON.parse(existingCart?.value ? existingCart.value : "[]")
  );
  
  const updated =  sortedCart.map(({id , amount , option}) => {
      if (id === cartId && option === cartOption) {
          return { ...{id , amount , option }, amount: newAmount };
      }
      else {
        return {id , amount , option}
      }
  });

  console.log(updated);


  cookies().set({
    name: "default-cart",
    value: JSON.stringify(updated),
    httpOnly: true,
    path: "/",
    expires,
  });
}


export async function removeCartItem(cartId: number, cartOption: "small" | "large") {

  
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 10);

  const existingCart = cookies().get("default-cart");

  const sortedCart : Cart[] = sortCart(
    JSON.parse(existingCart?.value ? existingCart.value : "[]")
  );
  
  const updated =  sortedCart.filter(item => !(item.id === cartId && item.option === cartOption));


  cookies().set({
    name: "default-cart",
    value: JSON.stringify(updated),
    httpOnly: true,
    path: "/",
    expires,
  });
}


export async function getDeliveryInfo() : Promise<z.infer<typeof checkoutFormSchema>> {
  const bioInfo = await getUserBio();
  const addressInfo  = await getUserShippingInfo();

  if(!bioInfo || !addressInfo) {
    return {} as z.infer<typeof checkoutFormSchema>
  }
  else {
    return  {
      client_name : `${bioInfo.firstname !== undefined ? bioInfo.firstname : ''} ${bioInfo.lastname !== undefined ? bioInfo.lastname : ''}`,
      phone_number : bioInfo.mobile,
      address : `${addressInfo.address_line1 !== undefined ? addressInfo.address_line1 : ''}${addressInfo.address_line2 !== undefined ? ',' + addressInfo.address_line2 : ''}`,
      nearest_place : addressInfo.description
    }
  }
}


export async function setCheckoutForm(data : z.infer<typeof checkoutFormSchema>) {
  await setUserBio({
    firstname : data.client_name,
    mobile : data.phone_number
  })

  await setUserShippingInfo({
    address_line1 : data.address,
    description : data.nearest_place
  })
}