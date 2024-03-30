"use client";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";
import { ScrollArea } from "../ui/scroll-area";
import { Cart, GetCart, PopCart } from "@/app/_actions";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function PopUpCart() {
  const [cartItems, setCartItems] = useState<PopCart[] | null>(null);

  const pathName = usePathname();

  useEffect(() => {
    async function getCart() {
      setCartItems(await GetCart());
    }
    getCart();
  }, []);

  return (
    <Fragment>
      <Link href={'/checkout-order'} className={cn(" flex sm:hidden items-center" ,!pathName.startsWith("/checkout-order") ? "flex" : "hidden")}>
        <ShoppingBagIcon
          className="h-6 w-6 flex-shrink-0 text-foreground group-hover:text-accent-foreground"
          aria-hidden="true"
        />
        <span className="ml-1 pt-1 text-sm font-medium text-foreground group-hover:text-accent-foreground">
          {cartItems ? cartItems.length : 0}
        </span>
      </Link>
      <Popover className="ml-4  hidden sm:flow-root text-sm lg:relative lg:ml-8">
        <Popover.Button className="group -m-2 flex items-center p-2">
          <ShoppingBagIcon
            className="h-6 w-6 flex-shrink-0 text-foreground group-hover:text-accent-foreground"
            aria-hidden="true"
          />
          <span className="ml-2 text-sm font-medium text-foreground group-hover:text-accent-foreground">
            {cartItems ? cartItems.length : 0}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Panel className="absolute z-40 inset-x-0 top-16 mt-px bg-background pb-6 shadow-lg sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-foreground lg:ring-opacity-5">
            <ScrollArea className=" h-[300px]">
              <h2 className="sr-only">Shopping Cart</h2>
              <form className="mx-auto max-w-2xl px-4">
                <ul role="list" className="divide-y divide-border">
                  {cartItems ? (
                    cartItems.map(
                      ({ cart: { id, amount, option }, imgSrc, name }) => (
                        <li
                          key={`${id}-${name}`}
                          className="flex items-center py-6"
                        >
                          <img
                            src={imgSrc}
                            alt={imgSrc}
                            className="h-16 w-16 flex-none rounded-md border border-border"
                          />
                          <div className="ml-4 flex-auto">
                            <h3 className="font-medium text-foreground">
                              {name}
                            </h3>
                            <p className="text-accent-foreground">
                              option :{" "}
                              <span className=" text-primary">{option}</span>
                            </p>
                            <p className="text-accent-foreground">
                              amount{" "}
                              <span className=" text-primary">{amount}</span>
                            </p>
                          </div>
                        </li>
                      )
                    )
                  ) : (
                    <div></div>
                  )}
                </ul>

                <Button
                  variant={"default"}
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium shadow-sm hover:bg-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/70 focus:ring-offset-2 focus:ring-offset-accent-foreground transition-colors duration-300"
                >
                  Checkout
                </Button>

                <p className="mt-6 text-center">
                  <a
                    href="/checkout-order"
                    className="text-sm font-medium text-primary hover:text-primary/70 transition-colors duration-300"
                  >
                    View Shopping Bag
                  </a>
                </p>
              </form>
            </ScrollArea>
          </Popover.Panel>
        </Transition>
      </Popover>
    </Fragment>
  );
}
