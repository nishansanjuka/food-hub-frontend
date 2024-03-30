"use client";

import React from "react";
import { Food } from "../foods";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function OrderItem({
  food,
  foodIdx,
  isClose = true
}: {
  food: Food;
  foodIdx?: number;
  isClose? : boolean
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <div ref={ref} key={food.id} className="flex py-6 sm:py-10">
      <div className="relative aspect-h-4 aspect-w-4 bg-accent sm:aspect-none group-hover:opacity-75 h-full">
        {!inView && (
          <div className="flex flex-col space-y-3 bg-background w-full h-full rounded-md ">
            <Skeleton className=" w-full h-full rounded-lg" />
          </div>
        )}

        <Image
          src={food.imageSrc}
          alt={food.imageAlt}
          width={500}
          height={500}
          className={cn(
            "h-24 w-24 rounded-md object-cover object-center 2xl:h-48 2xl:w-48 transition-opacity duration-500",
            inView ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-around sm:ml-6">
        <div className="relative pr-9 sm:grid xl:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-foreground text-xl font-bold">{food.name}</h3>
            </div>

            <div className="mt-1 flex text-sm">
              {food.options ? (
                <RadioGroup defaultValue="comfortable" className=" flex items-center my-1">
                  {Object.values(food.options).map((option) => (
                    <div key={food.id} className="flex items-center space-x-2 cursor-pointer">
                      <RadioGroupItem value={option} id={`${food.id}`} />
                      <Label htmlFor={`${food.id}`} className=" text-md capitalize cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : null}
            </div>

            <p className="mt-1 text-sm font-medium text-primary">
              {Intl.NumberFormat("en-LK" , {
                style : "currency",
                currency : "LKR",
              }).format(food.price)}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <label htmlFor={`quantity-${foodIdx}`} className="sr-only">
              Quantity, {food.name}
            </label>

            <div className=" grid grid-cols-3 border border-border rounded-sm bg-accent/30 w-fit">

              <span className=" cursor-pointer aspect-square border-r border-border w-8 flex justify-center items-center text-foreground font-extrabold">-</span>
              
              <span className=" relative aspect-square w-8 ">
                <input type='number' className=" appearance-none absolute top-0 left-0  right-0 bottom-0 bg-transparent outline-none text-center p-1" defaultValue={'1'} min={'0'} max={'20'} />
              </span>
              
              <span className=" cursor-pointer aspect-square border-l border-border w-8 flex justify-center items-center text-foreground font-extrabold">+</span>

            </div>
            

            {isClose && <div className="absolute right-0 top-0">
              <button
                type="button"
                className="-m-2 inline-flex p-2 text-primary hover:text-primary/50 transition-colors duration-300"
              >
                <span className="sr-only">Remove</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>}
          </div>
        </div>

        <p className="flex space-x-2 text-sm  text-accent-foreground">
          {food.description}
        </p>
      </div>
    </div>
  );
}
