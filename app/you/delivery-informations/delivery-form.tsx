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
import { Textarea } from "@/components/ui/textarea";
import { getUserShippingInfo, setUserShippingInfo } from "../../_actions";
import { cn } from "@/lib/utils";

export const deliveryformSchema = z.object({
  apt: z.string().min(2).max(50),
  address_line1: z.string().min(0).max(100).optional(),
  address_line2: z.string().min(0).max(100).optional(),
  description: z.string().min(2).max(300),
});

export default function DeliveryForm() {
  const [load, setLoad] = useState<boolean>(false);
  const form = useForm<z.infer<typeof deliveryformSchema>>({
    resolver: zodResolver(deliveryformSchema),
    defaultValues: async () => await getUserShippingInfo() as z.infer<typeof deliveryformSchema>
  });

  async function onSubmit(values: z.infer<typeof deliveryformSchema>) {
    setLoad(true);
    setUserShippingInfo(values);
    setLoad(false);
  }

  return (
    <Form {...form}>
      <form className="p-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="apt"
          render={({ field }) => (
            <FormItem className="mb-10">
              <FormLabel className=" xl:text-md 2xl:text-xl">
                Hostel or Boad <span className=" text-primary">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className=" xl:text-md 2xl:text-lg"
                  placeholder="hostel or boad?"
                  {...field}
                />
              </FormControl>
              <FormDescription className=" text-xs xl:text-md">
                Varity of the place where you currently available
              </FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address_line1"
          render={({ field }) => (
            <FormItem className=" my-10">
              <FormLabel className=" xl:text-md 2xl:text-xl">
                First Line / Number of Address{" "}
                <span className=" text-primary">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  className=" xl:text-md 2xl:text-lg"
                  placeholder="number of address"
                  {...field}
                />
              </FormControl>
              <FormDescription className=" text-xs xl:text-md">
                First line of the adddress
              </FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address_line2"
          render={({ field }) => (
            <FormItem className=" my-10">
              <FormLabel className=" xl:text-md 2xl:text-xl">
                Second Line / Lane or Place{" "}
                <span className=" text-primary">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  className=" xl:text-md 2xl:text-lg"
                  placeholder="lane details"
                  {...field}
                />
              </FormControl>
              <FormDescription className=" text-xs xl:text-md">
                Second line of the adddress
              </FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className=" mb-5">
              <FormLabel className=" xl:text-md 2xl:text-xl">
                Description About Surroundings<span className=" text-primary">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className=" h-[150px] xl:h-[70px] xl:text-md 2xl:text-lg"
                  placeholder="lane details"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs xl:text-md">
                Please provide details about your surroundings or any landmarks
                near your house. This will help me find the right place easily.
                Thank you!
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
