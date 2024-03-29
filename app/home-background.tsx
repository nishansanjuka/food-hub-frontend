"use client";

import Image from "next/image";
import mobileBg from "@/public/mobile-bg.jpg";
import desktopBg from "@/public/desktop-bg.jpg";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

export default function HomeBackground() {
    
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
  });

  return (
    <div ref={ref}>
      <Image
        alt="bg"
        src={mobileBg}
        sizes={"100vw"}
        placeholder="blur"
        className={cn(" sm:hidden transition-opacity duration-500 object-cover absolute -z-30 top-0 left-0 right-0 bottom-0 h-[100vh]", inView ? "opacity-100" : "opacity-0")}
      />

      <Image
        alt="bg"
        src={desktopBg}
        placeholder="blur"
        width={1920}
        height={1080}
        className={cn(" hidden transition-opacity duration-500 sm:block object-cover absolute -z-30 left-0 right-0 top-0 bottom-0 w-full h-full" , inView ? "opacity-100" : "opacity-0")}
      />
    </div>
  );
}
