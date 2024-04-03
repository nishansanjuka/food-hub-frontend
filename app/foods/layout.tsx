import PopUpCart from "@/components/layout/cart-popup";
import YouHeader from "@/components/layout/header-you";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function YouLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className=" w-full">
        <div className="">
          <main className=" relative">
            <div className=" w-full absolute z-10 bg-background right-0 md:flex sm:px-20 py-10 hidden justify-between pr-2 items-end">
              <div className="w-full  p-5 sm:p-0 lg:w-[80%] xl:w-[60%] space-y-2 sm:space-y-4">
                <h1 className=" text-2xl sm:text-3xl font-extrabold text-foreground">
                  Delicious Dishes: Explore a World of Flavors
                </h1>
                <p className=" text-sm  text-foreground/80">
                  Dive into a curated selection of food options, featuring a
                  variety of cuisines and dietary needs. Find inspiration for
                  your next meal or discover something new to try!
                </p>
              </div>

              <div className="  hidden sm:block">
                <PopUpCart />
              </div>
            </div>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
