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
    await setUserShippingInfo(values);
    setLoad(false);
  }

  return (
    <Form {...form}>
      <form className="p-2" onSubmit={form.handleSubmit(onSubmit)}>

        <FormField
          control={form.control}
          name="address_line1"
          render={({ field }) => (
            <FormItem className=" my-10">
              <FormLabel className=" text-sm">
                Address : First Line / Number of Address{" "}
                <span className=" text-primary">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  className=" "
                  placeholder="number of address"
                  {...field}
                />
              </FormControl>
              <FormDescription className=" text-xs">
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
              <FormLabel className=" text-sm">
                Address : Second Line / Lane or Place{" "}
                <span className=" text-primary">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  className=" "
                  placeholder="lane details"
                  {...field}
                />
              </FormControl>
              <FormDescription className=" text-xs">
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
              <FormLabel className=" text-sm">
                Description About Surroundings<span className=" text-primary">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className=" h-[150px] xl:h-[70px] "
                  placeholder="lane details if in a hostel then name of the hostal and specify girls or boys"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Please provide details about your surroundings or any landmarks
                near your house. This will help me find the right place easily.
                Thank you!
              </FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />

        <Button className={cn(" text-sm w-full ", load ? "animate-pulse" : "animate-none")} type="submit">
        {load ? "Saving ..." : "Save" }
        </Button>
      </form>
    </Form>
  );
}
