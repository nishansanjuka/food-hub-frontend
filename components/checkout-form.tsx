"use client";

import { ScrollArea } from "./ui/scroll-area";
import OrderItem from "./pages/order-item";
import { useEffect, useState } from "react";
import { CheckoutCart, getDeliveryInfo, setCheckoutForm } from "@/app/_actions";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useCart, useUpdateCart } from "./context-hooks/cart-context";
import { Salad } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import PopDrawer from "./pop-drawer";

export const checkoutFormSchema = z.object({
  address: z.string().min(5),
  client_name: z.string().min(1),
  nearest_place: z.string().min(1),
  phone_number: z.string(),
});

export default function CheckoutForm({checkout} : {checkout : boolean}) {
  const [orderItems, setorderItems] = useState<CheckoutCart[] | null>(null);

  const setCartItems = useUpdateCart();
  const CartItems = useCart();
  const [load, setLoad] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: async () => await getDeliveryInfo(),
  });

  useEffect(() => {
    if(checkout && form.formState.defaultValues) {
      form.handleSubmit(onSubmit)();
    }
  }, [form.formState.defaultValues])
  


  useEffect(() => {

    async function getCart() {
      await setCartItems();
      setorderItems(CartItems);
    }
    getCart();
  }, [CartItems]);

  const onSubmit = async (values: z.infer<typeof checkoutFormSchema>) => {
    setLoad(true);
    await setCheckoutForm(values);
    setLoad(false);
    setOpen(true);
  };

  return (
    <div className=" h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 xl:py-[12vh] 2xl:py-[8vh] pt-10 sm:px-6 lg:max-w-7xl 2xl:max-w-[80%] lg:px-8">
        <div className=" lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <Card className=" col-span-12 xl:col-span-7 bg-background my-8 sm:my-0 border-border">
            <CardHeader>
              <h1 className="text-3xl font-bold tracking-tight text-accent-foreground 2xl:text-4xl">
                Food Cart
              </h1>
            </CardHeader>
            <CardContent>
              <section aria-labelledby="cart-heading" className="w-full">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <ScrollArea className=" xl:px-5">
                  <ul role="list" className=" xl:h-[60vh] 2xl:h-[70vh]">
                    {orderItems && orderItems?.length > 0
                      ? orderItems.map((order, foodIdx) => (
                          <li key={foodIdx}>
                            <OrderItem order={order} />
                          </li>
                        ))
                      : orderItems?.length !== 0
                      ? [1, 2, 3, 4, 5].map((i) => (
                          <li key={`dummy-${i}`}>
                            <OrderItem
                              order={{
                                cart: { id: 1, amount: 1, option: "small" },
                                imgSrc: "",
                                additionPrice: 0,
                                name: "",
                                price: 0,
                              }}
                              loading={true}
                            />
                          </li>
                        ))
                      : orderItems.length === 0 && (
                          <li>
                            <div className=" h-[100px] xl:h-[60vh]  2xl:h-[70vh] flex w-full items-center justify-center flex-col">
                              <Salad className=" w-8 h-8 text-accent-foreground" />
                              <p className=" text-foreground/70 px-5">
                                cart is empty
                              </p>
                            </div>
                          </li>
                        )}
                  </ul>
                </ScrollArea>
              </section>
            </CardContent>
          </Card>

          {/* Order summary */}

          <div className=" w-full col-span-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
                <FormField
                  control={form.control}
                  name="client_name"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel className=" xl:text-md">
                        Name <span className=" text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className=" xl:text-sm"
                          placeholder="name of the reciever"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className=" text-xs xl:text-md">
                        name of the reciever
                      </FormDescription>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className=" my-5">
                      <FormLabel className=" xl:text-md">
                        Mobile Number <span className=" text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          className=" xl:text-sm"
                          placeholder="Mobile number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className=" text-xs xl:text-md">
                        Active mobile number to contact
                      </FormDescription>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel className=" xl:text-md">
                        Adddress <span className=" text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className=" xl:text-sm"
                          placeholder="hostel name or address"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className=" text-xs xl:text-md">
                        Varity or number of the place where you currently
                        available to be delivered
                      </FormDescription>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nearest_place"
                  render={({ field }) => (
                    <FormItem className=" mb-5">
                      <FormLabel className=" xl:text-md">
                        Description About Surroundings
                        <span className=" text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className=" h-[150px] xl:h-[70px] xl:text-md"
                          placeholder="lane details if in a hostel then name of the hostal and specify girls or boys"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs xl:text-md">
                        Please provide details about your surroundings or any
                        landmarks near your house. This will help me find the
                        right place easily. Thank you!
                      </FormDescription>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={load}
                  className={cn(
                    " w-full",
                    load ? "animate-pulse" : "animate-none"
                  )}
                >
                  {load ? "please wait..." : "Place Order"}
                </Button>

                <PopDrawer
                  open={open}
                  setOpen={setOpen}
                  title="Order summary"
                  description="Place order to deliver to ur door step!"
                >
                  <section className="">
                    <section
                      aria-labelledby="summary-heading"
                      className="mt-0 rounded-lg px-4 py-0 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                    >
                      <dl className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <dt className="text-sm text-accent-foreground">
                            Subtotal
                          </dt>
                          <dd className="text-sm font-medium  text-foreground">
                            {Intl.NumberFormat("en-LK", {
                              style: "currency",
                              currency: "LKR",
                            }).format(
                              CartItems
                                ? CartItems.reduce(
                                    (acc: number, item: CheckoutCart) => {
                                      if (item.cart.option === "large") {
                                        const itemPrice =
                                          item.price + item.additionPrice;
                                        const totalPriceForItem =
                                          itemPrice * item.cart.amount;
                                        return acc + totalPriceForItem;
                                      } else {
                                        const totalPriceForItem =
                                          item.price * item.cart.amount;
                                        return acc + totalPriceForItem;
                                      }
                                    },
                                    0
                                  )
                                : 0
                            )}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between border-t dborder-border pt-4">
                          <dt className="flex items-center text-sm text-accent-foreground">
                            <span>Delivery estimate</span>
                            <div className="ml-2 flex-shrink-0  text-accent-foreground hover:text-gray-500">
                              <span className="sr-only">
                                Learn more about how shipping is calculated
                              </span>
                              <QuestionMarkCircleIcon
                                className="h-5 w-5 cursor-pointer"
                                aria-hidden="true"
                              />
                            </div>
                          </dt>
                          <dd className="text-sm font-medium  text-foreground">
                            {Intl.NumberFormat("en-LK", {
                              style: "currency",
                              currency: "LKR",
                            }).format(0)}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between border-t dborder-border pt-4">
                          <dt className="text-base font-medium  text-foreground">
                            Order total
                          </dt>
                          <dd className="text-base font-medium  text-foreground">
                            {Intl.NumberFormat("en-LK", {
                              style: "currency",
                              currency: "LKR",
                            }).format(
                              CartItems
                                ? CartItems.reduce(
                                    (acc: number, item: CheckoutCart) => {
                                      if (item.cart.option === "large") {
                                        const itemPrice =
                                          item.price + item.additionPrice;
                                        const totalPriceForItem =
                                          itemPrice * item.cart.amount;
                                        return acc + totalPriceForItem;
                                      } else {
                                        const totalPriceForItem =
                                          item.price * item.cart.amount;
                                        return acc + totalPriceForItem;
                                      }
                                    },
                                    0
                                  )
                                : 0
                            )}
                          </dd>
                        </div>
                      </dl>
                    </section>

                    <Button
                      className={cn(
                        " xl:text-sm w-full mt-10 ",
                        load ? "animate-pulse" : "animate-none"
                      )}
                    >
                      {load ? "Please wait ..." : "Checkout"}
                    </Button>
                  </section>
                </PopDrawer>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
