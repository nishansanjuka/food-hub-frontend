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
  lastname: z.string().min(2).max(50).optional(),
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
              <FormLabel className=" ">First Name <span className=" text-primary">*</span></FormLabel>
              <FormControl>
                <Input
                  className=" xl:text-sm"
                  placeholder="Your first name"
                  {...field}
                />
              </FormControl>
              <FormDescription className=" text-xs">
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
              <FormLabel className=" ">Last Name <span className=" text-primary">(Optional)</span></FormLabel>
              <FormControl>
                <Input
                  className=" xl:text-sm"
                  placeholder="Your last name"
                  {...field}
                />
              </FormControl>
              <FormDescription className=" text-xs">
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
              <FormLabel className=" ">Mobile Number <span className=" text-primary">*</span></FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  className=" xl:text-sm"
                  placeholder="Mobile number"
                  {...field}
                />
              </FormControl>
              <FormDescription className=" text-xs">
                Mobile Number without Country code
              </FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />

        <Button className={cn("  w-full ", load ? "animate-pulse" : "animate-none")} type="submit">
          {load ? "Saving ..." : "Save" }
        </Button>
      </form>
    </Form>
  );
}

