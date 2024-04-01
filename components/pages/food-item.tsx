"use client";

import { Food } from "@/components/foods";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useInView } from "react-intersection-observer";
import PopDrawer from "../pop-drawer";
import CartForm from "@/app/foods/cart-form";

export default function FoodItem({ food }: { food: Food }) {
  const [open, setOpen] = useState(false);



  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleAddToCart = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <div
        ref={ref}
        className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-background"
      >
        <div className=" relative aspect-h-4 aspect-w-4 bg-accent sm:aspect-none group-hover:opacity-75 h-full">
          {!inView && (
            <div className="flex flex-col space-y-3 bg-background w-full h-full p-3 ">
              <Skeleton className=" w-full h-full rounded-lg" />
            </div>
          )}

          <Image
            width={500}
            height={500}
            src={food.imageSrc}
            alt={food.imageAlt}
            className={cn(
              " h-full w-full object-cover object-center sm:h-full sm:w-full transition-opacity duration-500",
              inView ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        <div className="flex flex-1 flex-col space-y-2 p-4">
          <h3 className="text-sm font-medium text-foreground">
            <div onClick={handleAddToCart} className=" cursor-pointer">
              <span aria-hidden="true" className="absolute inset-0" />
              {food.name}
            </div>
          </h3>
          <p className="text-sm text-foreground/90">{food.description}</p>
          <div className="flex flex-1 flex-col justify-end">
            <p className="text-sm italic text-card-foreground/50">
              {food.options[0]}
            </p>
            <p className="text-base font-medium text-primary">
              {Intl.NumberFormat("en-LK", {
                style: "currency",
                currency: "LKR",
              }).format(food.price)}
            </p>
          </div>
        </div>
      </div>

        {open && (
          <PopDrawer
            key={food.description}
            title={"Add To Cart"}
            description={"you can manage your shopping bag later"}
            open={open}
            setOpen={setOpen}
          >
            <CartForm food={food} setOpen={setOpen} />
          </PopDrawer>
        )}
    </Fragment>
  );
}
