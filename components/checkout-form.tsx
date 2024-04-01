"use client";

import { ScrollArea } from "./ui/scroll-area";
import OrderItem from "./pages/order-item";
import { useEffect, useState } from "react";
import { GetCart, CheckoutCart } from "@/app/_actions";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useCart, useUpdateCart } from "./context-hooks/cart-context";
import { Salad } from "lucide-react";

export default function CheckoutForm() {

  const [orderItems, setorderItems] = useState<CheckoutCart[] | null>(null);

  const setCartItems = useUpdateCart();
  const CartItems = useCart();

  useEffect(() => {
    async function getCart() {
      await setCartItems();
      setorderItems(CartItems);
    }
    getCart();
  }, [CartItems]);

  return (
    <div className=" h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 xl:py-[12vh] 2xl:py-[8vh] pt-10 sm:px-6 lg:max-w-7xl 2xl:max-w-[80%] lg:px-8">
        <div className=" lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <Card className=" col-span-12 xl:col-span-7 bg-background border-transparent xl:border-border">
            <CardHeader>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Food Cart
              </h1>
            </CardHeader>
            <CardContent>
              <section aria-labelledby="cart-heading" className="w-full">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <ScrollArea className=" xl:px-5">
                  <ul role="list" className=" xl:h-[60vh] 2xl:h-[74vh]">
                    {orderItems && orderItems?.length > 0 ? (
                      orderItems.map((order, foodIdx) => (
                        <li key={foodIdx}>
                          <OrderItem order={order} />
                        </li>
                      ))
                    ) : orderItems?.length !== 0 ? (
                      [1, 2, 3, 4, 5].map((i) => (
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
                    ) : (
                      <li>
                        <div className=" xl:h-[60vh]  2xl:h-[75vh] flex w-full items-center justify-center flex-col">
                          <Salad className=" w-8 h-8 text-accent-foreground"/>
                          <p className=" text-foreground/70 border-b border-border px-5">cart is empty</p>
                        </div>
                      </li>
                    )}
                  </ul>
                </ScrollArea>
              </section>
            </CardContent>
          </Card>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">$99.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how shipping is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$5.00</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax estimate</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how tax is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">$8.32</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">$112.32</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
