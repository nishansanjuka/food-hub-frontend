import Foods from "@/components/foods";
import Footer from "@/components/footer";
import PopUpCart from "@/components/layout/cart-popup";
import { ScrollArea } from "@/components/ui/scroll-area";
import { foods } from "@/constants/data";

export default function FoodsPage() {
  return (
    <div className="h-screen w-full">
      <ScrollArea className=" w-full sm:p-20 h-screen">
        <div className=" w-full flex justify-between pr-2 items-end">
          <div className="w-full  p-5 sm:p-0 pt-24 lg:w-[80%] xl:w-[60%] space-y-2 sm:space-y-4">
            <h1 className=" text-2xl sm:text-4xl font-extrabold text-foreground">
              Delicious Dishes: Explore a World of Flavors
            </h1>
            <p className=" text-sm sm:text-lg text-foreground/80">
              Dive into a curated selection of food options, featuring a variety
              of cuisines and dietary needs. Find inspiration for your next meal
              or discover something new to try!
            </p>
          </div>
          <PopUpCart/>
        </div>
        <div className="ml-5 sm:ml-0 border-b pt-3 w-[80%] sm:w-full border-border"></div>
        <Foods foods={foods} />
        <Footer />
      </ScrollArea>
    </div>
  );
}
