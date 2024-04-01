"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  CheckoutCart,
  GetCart,
  removeCartItem,
  updateCart,
} from "@/app/_actions";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { X } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useUpdateCart } from "../context-hooks/cart-context";

export default function OrderItem({ order , loading}: { order: CheckoutCart , loading? :boolean }) {
  const [amount, setAmount] = useState<number | null>(null);

  const [load, setLoad] = useState<boolean>(false);
  const [removeLoad, setRemoveLoad] = useState<boolean>(false);

  const [Order, setOrder] = useState<CheckoutCart | null>(null);

  const amountRef = useRef<HTMLInputElement>(null);

  const setCartItems = useUpdateCart();

  const { toast } = useToast();

  const handleOrderAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.target.value));

    if (parseInt(event.target.value) === 0) {
      event.target.value = "1";
    } else if (parseInt(event.target.value) > 20) {
      event.target.value = "20";
    }
  };

  useEffect(() => {
    if (!Order) {
      setOrder(order);
    }

    async function handleUpdate() {
      setLoad(true);
      if (Order) {
        await updateCart(Order.cart.id, Order.cart.option, amount ? amount : 1);
      }

      const obj: CheckoutCart = (await GetCart()).find(
        (cart) =>
          cart.cart.id === order.cart.id &&
          cart.cart.option === order.cart.option
      ) as CheckoutCart;

      setOrder(obj ? obj : null);
      setLoad(false);
    }

    if (amount) {
      if (amount > 0 && amount <= 20) {
        handleUpdate();
      }
    }
  }, [amount]);

  const handleDropAmount = () => {
    const currentValue = parseInt(
      amountRef.current ? amountRef.current.value : "0"
    );
    if (amountRef.current && currentValue > 1) {
      amountRef.current.value = (
        parseInt(amountRef.current.value) - 1
      ).toString();
      setAmount(parseInt(amountRef.current.value));
    }
  };

  const handleAddAmount = () => {
    const currentValue = parseInt(
      amountRef.current ? amountRef.current.value : "0"
    );
    if (amountRef.current && currentValue < 20) {
      amountRef.current.value = (
        parseInt(amountRef.current.value) + 1
      ).toString();
      setAmount(parseInt(amountRef.current.value));
    }
  };

  const handleRemove = async () => {
    setRemoveLoad(true);
    if (Order) {
      await removeCartItem(Order.cart.id, Order.cart.option);

      const obj: CheckoutCart = (await GetCart()).find(
        (cart) =>
          cart.cart.id === order.cart.id &&
          cart.cart.option === order.cart.option
      ) as CheckoutCart;

      await setCartItems();
      setOrder(null);
      setRemoveLoad(false);
    }
  };

  return (
    <div>
      <Toaster />
      {Order && (
        <div className="flex py-6 sm:py-10 items-center border-b border-border">
          {!removeLoad && !loading ? (
            <Fragment>
              <div className="relative aspect-h-4 aspect-w-4 bg-accent sm:aspect-none group-hover:opacity-75 h-full">
                <Image
                  src={Order.imgSrc}
                  alt={Order.imgSrc}
                  width={500}
                  height={500}
                  className={cn(
                    " h-28 w-28 rounded-md object-cover object-center  transition-opacity duration-500 opacity-100"
                  )}
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col justify-around sm:ml-6">
                <div className="relative pr-0 sm:grid grid-cols-2 sm:gap-x-10 sm:pr-0 items-center">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-foreground text-2xl font-bold">
                        {Order.name}
                      </h3>
                    </div>
                    <div className="mt-1 flex text-xs sm:text-sm">
                      {Order.cart.option}
                    </div>

                    {!load ? (
                      <p className="mt-1 text-xs sm:text-sm  font-medium text-primary">
                        {Intl.NumberFormat("en-LK", {
                          style: "currency",
                          currency: "LKR",
                        }).format(
                          Order.cart.option === "large"
                            ? (Order.price + Order.additionPrice) *
                                Order.cart.amount
                            : Order.price * Order.cart.amount
                        )}
                      </p>
                    ) : (
                      <p className="mt-1 text-xs sm:text-sm font-medium text-primary">
                        please wait...
                      </p>
                    )}
                  </div>

                  <div
                    className={cn(
                      "my-1 xl:my-2",
                      load ? "animate-pulse" : "animate-none"
                    )}
                  >
                    <div className=" grid grid-cols-3 border border-border rounded-sm bg-accent/30 w-fit">
                      <button
                        disabled={load}
                        onClick={handleDropAmount}
                        className=" select-none hover:bg-primary/5 focus:bg-primary/10 transition-colors duration-300 cursor-pointer aspect-square border-r border-border w-6 md:w-9 flex justify-center items-center text-foreground font-extrabold"
                      >
                        -
                      </button>

                      <span className=" relative aspect-square w-6 md:w-9 ">
                        <div>
                          <div className="absolute top-0 left-0  right-0 bottom-0">
                            <div className=" h-full">
                              <Input
                                disabled={load}
                                defaultValue={Order.cart.amount}
                                min={"1"}
                                max={"20"}
                                ref={amountRef}
                                onChange={handleOrderAmount}
                                type="number"
                                className={cn(
                                  " h-full border-none text-xs xl:text-lg appearance-none  bg-transparent outline-none text-center p-1 focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-0"
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </span>

                      <button
                        disabled={load}
                        onClick={handleAddAmount}
                        className=" select-none hover:bg-primary/5 focus:bg-primary/10 transition-colors duration-300 cursor-pointer aspect-square border-l border-border w-6 md:w-9 flex justify-center items-center text-foreground font-extrabold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleRemove}
                    className=" absolute bottom-2 right-0 flex items-center text-primary hover:text-primary/60 text-xs sm:text-base cursor-pointer transition-colors duration-300"
                  >
                    <X className=" w-3 h-3 sm:w-5 sm:h-5" />
                    <p>close</p>
                  </button>
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="relative aspect-h-4 aspect-w-4 bg-accent sm:aspect-none group-hover:opacity-75 h-full">
                <Skeleton
                  className={cn(
                    " h-28 w-28 rounded-md object-cover object-center  transition-opacity duration-500 opacity-100"
                  )}
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col justify-around sm:ml-6">
                <div className="relative pr-0 sm:grid grid-cols-2 sm:gap-x-10 sm:pr-0 items-center">
                  <div>
                    <div className="flex justify-between">
                      <Skeleton className=" w-full h-5" />
                    </div>
                    <div className="mt-1 flex text-xs sm:text-sm">
                      <Skeleton className=" w-1/4 h-3" />
                    </div>

                    {!load ? (
                      <div className="mt-1 text-xs sm:text-sm  font-medium text-primary">
                        <Skeleton className=" w-1/3 h-4" />
                      </div>
                    ) : (
                      <p className="mt-1 text-xs sm:text-sm font-medium text-primary">
                        please wait...
                      </p>
                    )}
                  </div>

                  <div
                    className={cn(
                      "my-1 xl:my-2",
                      load ? "animate-pulse" : "animate-none"
                    )}
                  >
                    <div className=" grid grid-cols-3 bg-accent/30 w-fit">
                      <Skeleton className=" w-6 h-6  md:w-9 md:h-9" />
                      <Skeleton className=" w-6 h-6  md:w-9 md:h-9" />
                      <Skeleton className=" w-6 h-6  md:w-9 md:h-9" />
                    </div>
                  </div>

                  <button
                    onClick={handleRemove}
                    className=" absolute bottom-2 right-0 flex items-center text-primary hover:text-primary/60 text-xs sm:text-base cursor-pointer transition-colors duration-300"
                  >
                    <Skeleton className=" w-10 h-4" />
                  </button>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
}
