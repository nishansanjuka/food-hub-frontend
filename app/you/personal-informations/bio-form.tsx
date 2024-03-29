"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { getUserBio, setUserBio } from "../../_actions";
import { cn } from "@/lib/utils";

export const bioformSchema = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  mobile: z
    .string()
    .min(2, {
      message: "Must include 10 digits! please do not use country code!",
    })
    .max(10, {
      message: "Must include 10 digits! please do not use country code!",
    }).regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
});

export default function BioForm() {

  const [load, setLoad] = useState<boolean>(false);

  const form = useForm<z.infer<typeof bioformSchema>>({
    resolver: zodResolver(bioformSchema),
    defaultValues: async () => await getUserBio() as z.infer<typeof bioformSchema>,
  });

  async function onSubmit(values: z.infer<typeof bioformSchema>) {
    setLoad(true);
    await setUserBio(values);
    setLoad(false);
  }

  return (
    <Form {...form}>
      <form className=" p-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel className=" xl:text-md 2xl:text-xl">First Name <span className=" text-primary">*</span></FormLabel>
              <FormControl>
                <Input
                  className=" xl:text-sm 2xl:text-lg"
                  placeholder="Your first name"
                  {...field}
                />
              </FormControl>
              <FormDescription className=" text-xs xl:text-md">
                Name which will appear on your profile as First Name
              </FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem className=" my-8">
              <FormLabel className=" xl:text-md 2xl:text-xl">Last Name <span className=" text-primary">*</span></FormLabel>
              <FormControl>
                <Input
                  className=" xl:text-sm 2xl:text-lg"
                  placeholder="Your last name"
                  {...field}
                />
              </FormControl>
              <FormDescription className=" text-xs xl:text-md">
                Name which will appear on your profile as Last Name
              </FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem className=" my-8">
              <FormLabel className=" xl:text-md 2xl:text-xl">Mobile Number <span className=" text-primary">*</span></FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  className=" xl:text-sm 2xl:text-lg"
                  placeholder="Mobile number"
                  {...field}
                />
              </FormControl>
              <FormDescription className=" text-xs xl:text-md">
                Mobile Number without Country code
              </FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />

        <Button className={cn(" xl:text-md 2xl:text-xl w-full ", load ? "animate-pulse" : "animate-none")} type="submit">
          {load ? "Saving ..." : "Save" }
        </Button>
      </form>
    </Form>
  );
}

