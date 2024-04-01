"use client";

import { Food } from "@/components/foods";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { AddToCart } from "../_actions";
import { useUpdateCart } from "@/components/context-hooks/cart-context";

export const cartFormSchema = z.object({
  id: z.string(),
  amount: z.string().refine((value) => value !== "0", {
    message: "amount cannot be '0'",
    path: ["amount"],
  }),
  option: z.enum(["small" , "large"]),
});

export default function CartForm({ food , setOpen }: { food: Food , setOpen: (value: React.SetStateAction<boolean>) => void; }) {
  const [load, setLoad] = useState<boolean>(false);
  const [isLarge, setisLarge] = useState<boolean>(false);
  const [Total, setTotal] = useState<number>(0);


  const setCartItems = useUpdateCart();

  const form = useForm<z.infer<typeof cartFormSchema>>({
    resolver: zodResolver(cartFormSchema),
    defaultValues: {
      id: food.id.toString(),
      amount: "1",
      option: food.options[0],
    },
  });

  form.watch("option");
  form.watch("amount");


  const handleDropAmount = () => {
    const currentValue = parseInt(form.getValues().amount);
    if (currentValue > 1) {
      form.setValue("amount", (currentValue - 1).toString());
    }
  };

  const handleAddAmount = () => {
    const currentValue = parseInt(form.getValues().amount);
    if (currentValue < 20) {
      form.setValue("amount", (currentValue + 1).toString());
    }
  };

  async function onSubmit(values: z.infer<typeof cartFormSchema>) {
    setLoad(true);
    await AddToCart(values);
    await setCartItems();
    setOpen(false);
    setLoad(false);
  }

  useEffect(() => {
    setisLarge(form.getValues().option === "large");
    setTotal(form.getValues().option === 'large' ? (food.price + food.additionPrice) * parseInt(form.getValues().amount) : food.price * parseInt(form.getValues().amount));

  }, [form.formState]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex py-6 sm:py-10 items-center">
          
          <div className="relative aspect-h-4 aspect-w-4 bg-accent sm:aspect-none group-hover:opacity-75 h-full">
            <Image
              src={food.imageSrc}
              alt={food.imageAlt}
              width={500}
              height={500}
              className={cn(
                " h-28 w-28 rounded-md object-cover object-center 2xl:h-48 2xl:w-48 transition-opacity duration-500 opacity-100"
              )}
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col justify-around sm:ml-6">
            <div className="relative pr-9 sm:grid grid-cols-2 sm:gap-x-14 sm:pr-0 items-center">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-foreground text-2xl font-bold">
                    {food.name}
                  </h3>
                </div>

                <FormField
                  control={form.control}
                  name={"id"}
                  render={({ field }) => (
                    <FormItem className=" hidden">
                      <FormControl>
                        <Input
                          type={"number"}
                          className="text-sm"
                          placeholder="Your first name"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="mt-1 flex text-xs sm:text-sm xl:text-lg">
                  {food.options ? (
                    <FormField
                      control={form.control}
                      name={"option"}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className=" flex flex-col sm:flex-row sm:items-center my-1"
                            >
                              {Object.values(food.options).map((option) => (
                                <FormItem
                                  key={`${food.id}=${option}`}
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <FormControl className="cursor-pointer transition-all duration-300">
                                    <RadioGroupItem
                                      className="relative sm:top-[1px] xl:top-0"
                                      value={option}
                                    />
                                  </FormControl>
                                  <FormLabel className=" cursor-pointer">
                                    {option && option === "large" ? (
                                      <span className=" flex items-center h-fit space-x-2">
                                        <p>{option}</p>
                                        <p className=" text-primary">extra</p>
                                        <p className=" text-xs sm:text-sm text-primary"> 
                                          {Intl.NumberFormat("en-LK", {
                                            style: "currency",
                                            currency: "LKR",
                                          }).format(food.additionPrice)}
                                        </p>
                                      </span>
                                    ) : (
                                      option
                                    )}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ) : null}
                </div>

                <p className="mt-1 text-xs sm:text-sm font-medium text-primary">
                  {Intl.NumberFormat("en-LK", {
                    style: "currency",
                    currency: "LKR",
                  }).format(isLarge ? food.price + food.additionPrice : food.price)}
                </p>
              </div>

              <div className="my-1 xl:my-2">
                <div className=" grid grid-cols-3 border border-border rounded-sm bg-accent/30 w-fit">
                  <span
                    onClick={handleDropAmount}
                    className=" select-none hover:bg-primary/5 focus:bg-primary/10 transition-colors duration-300 cursor-pointer aspect-square border-r border-border w-6 flex justify-center items-center text-foreground font-extrabold"
                  >
                    -
                  </span>

                  <span className=" relative aspect-square w-6 ">
                    <FormField
                      control={form.control}
                      name={"amount"}
                      render={({ field }) => (
                        <FormItem className="absolute top-0 left-0  right-0 bottom-0">
                          <FormControl>
                            <Input
                              type="number"
                              className={cn(
                                " h-full border-none text-xs xl:text-lg appearance-none  bg-transparent outline-none text-center p-1",
                                !form.formState.errors.amount
                                  ? "focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-0"
                                  : ""
                              )}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </span>

                  <span
                    onClick={handleAddAmount}
                    className=" select-none hover:bg-primary/5 focus:bg-primary/10 transition-colors duration-300 cursor-pointer aspect-square border-l border-border w-6 flex justify-center items-center text-foreground font-extrabold"
                  >
                    +
                  </span>
                </div>
              </div>
            </div>

            <p className="flex space-x-2 text-xs sm:text-sm  text-accent-foreground">
              {food.description}
            </p>
          </div>
        </div>

        <Button
          type="submit"
          variant={"default"}
          disabled={load}
          className={cn(" w-full sm:font-bold  text-sm")}
        >
          {!load ? `Add to cart Total :${Intl.NumberFormat("en-LK" , {
            style : 'currency',
            currency : 'LKR'
          }).format(Total)}` : 'please wait...'}
          
          
        </Button>
      </form>
    </Form>
  );
}
