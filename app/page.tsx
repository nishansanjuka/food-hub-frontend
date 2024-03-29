import { Resturant } from "@/constants/data";
import FoodSummery from "@/components/food-summery";
import Footer from "@/components/footer";
import HomeBackground from "./home-background";


export default async function Home() {
  
  // await slow();

  return (
    <main className="w-full">

      <HomeBackground/>
      <div className="absolute -z-20 top-0 left-0 right-0 bottom-0 h-[100vh] bg-background/50"></div>

      <div className="flex justify-center w-full h-[100vh] absolute top-0">
        <div className=" mt-10 p-5 flex flex-col justify-center w-full pl-10">
          <h1 className=" text-4xl md:text-8xl 2xl:text-9xl max-w-7xl font-extrabold text-foreground">
            Savor the Flavor, Delivered to Your Doorstep!
          </h1>
          <p className=" md:mt-10 2xl:mt-20 text-lg md:text-2xl 2xl:text-3xl max-w-7xl font-medium p-2 text-foreground">
            Welcome to {Resturant.name}, where every meal is a journey of flavor and
            satisfaction! Step into a world of culinary delight where
            convenience meets excellence. Whether you&apos;re craving comfort
            classics or eager to explore new tastes, we&apos;re here to
            tantalize your taste buds and make every dining experience
            unforgettable. Start your culinary adventure with us today!
          </p>
        </div>
      </div>

      <div className="h-screen w-full"></div>
      
      <div className=" w-full">
        <FoodSummery/>
        <Footer/>
      </div>

      {/* <div>
        <DrawerDemo />
      </div> */}

      

    </main>
  );
}
