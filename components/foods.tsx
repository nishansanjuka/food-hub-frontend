"use client";

import FoodContainer from "@/components/pages/food-item";

export interface Food {
  id: number;
  name: string;
  href: string;
  price: number;
  description: string;
  options: ("small" | "large")[]
  imageSrc: string;
  imageAlt: string;
  additionPrice : number
} 

export default function Foods({ foods }: { foods: Food[] }) {
  return (
    <div className="bg-background w-full">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Foods</h2>

        <div className="grid gap-y-4 grid-cols-2 gap-x-2 sm:gap-x-6 sm:gap-y-10 md:grid-cols-1 xl:grid-cols-3 lg:gap-x-8">
          {foods.map((food: Food) => {
            return <FoodContainer key={`${food.id}-${food.name}`} food={food} />;
          })}
        </div>
      </div>
    </div>
  );
}
