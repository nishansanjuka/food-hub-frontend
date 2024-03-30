"use client";
import React, { useEffect, useState } from "react";
import { MobileSidebar } from "./layout/mobile-nav";
import { usePathname } from "next/navigation";
import { Resturant } from "@/constants/data";
import { cn } from "@/lib/utils";
import HomeNav from "./layout/home-nav";
import PopUpCart from "./layout/cart-popup";

export default function HeaderSection() {
  const [scrollY, setScrollY] = useState<boolean>(false);

  const pathName = usePathname();

  useEffect(() => {
    const onScrolling = () => {
      const scrollY = window.scrollY;
      if (scrollY < 20) {
        setScrollY(false);
      } else if (scrollY > 30) {
        setScrollY(true);
      }
    };

    window.addEventListener("scroll", onScrolling);

    return () => {
      window.removeEventListener("scroll", onScrolling);
    };
  }, []);

  return (
    <div
      className={cn(
        " z-20 fixed w-full p-5  flex items-center space-x-5 transition duration-300 border-border",
        scrollY || pathName !== "/" ? " bg-background border-b" : "",
        pathName !== "/" ? "sm:hidden" : ""
      )}
    >
      <MobileSidebar />  
      <div className=" flex items-center justify-between w-full">
        <h1 className=" text-lg md:text-2xl md:font-extrabold font-bold">
          {Resturant.name}
        </h1>
        <HomeNav/>
        <PopUpCart/>
      </div>
    </div>
  );
}
