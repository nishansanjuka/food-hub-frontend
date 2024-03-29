"use client";

import { foods } from "@/constants/data";
import Link from "next/link";
import { Food } from "./foods";
import FoodContainer from "./pages/food-container";

export default function FoodSummery() {
  return (
    <div className="bg-background w-full border-b border-border px-0 xl:px-3">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Recent Orders
          </h2>
          <Link
            href="/foods"
            className="hidden text-sm md:text-lg font-medium text-primary hover:text-primary/90 md:block"
          >
            See more foods
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {foods.map((food: Food, index: number) => {
            if (index < 4) {
              return <FoodContainer key={food.id} food={food} />;
            }
          })}
        </div>
        <div className="mt-8 text-sm md:hidden">
          <Link
            href="/foods"
            className="font-medium text-sm md:text-lg text-primary hover:text-primary/90"
          >
            See more foods
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
