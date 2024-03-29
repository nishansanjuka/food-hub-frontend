"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {usePathname} from 'next/navigation'
import { useEffect, useState } from "react";

export default function YouHeader() {
  const pathname = usePathname();
  

  const [path, setpath] = useState<string | null>(pathname);

  return (
    <div className=" absolute top-0 right-0 z-10 bg-background w-full flex space-x-5 border-b border-border p-3 py-5  pt-24 xl:mt-0 items-center">
        <Link className={cn(" text-md font-bold" , pathname.startsWith('/you/personal-informations') ? 'text-primary' : 'text-foreground')} href={'/you/personal-informations'}>Personal Informations</Link>
        <Link className={cn(" text-md font-bold" , pathname.startsWith('/you/delivery-informations') ? 'text-primary' : 'text-foreground')} href={'/you/delivery-informations'}>Delivery Informations</Link>
    </div>
  )
}
