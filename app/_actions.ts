"use server";
import { z } from "zod";
import { bioformSchema } from "./you/personal-informations/bio-form";
import { cookies } from "next/headers";
import { deliveryformSchema } from "./you/delivery-informations/delivery-form";

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
