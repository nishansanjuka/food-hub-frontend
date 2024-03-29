import { NavItem, navItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import {icons as Icons} from 'lucide-react'

export default function HomeNav() {
  return (
    <div className=" hidden sm:flex items-center justify-center space-x-10 flex-1">
      {navItems.map((item: NavItem, index: number) => {
        const Icon = Icons[item.icon || "ArrowRight"];
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "before:content-[' '] underline-offset-2 group flex items-center text-sm sm:text-xl font-extrabold hover:text-primary tracking-wider"
                )}
              >
                <span>{item.title.toUpperCase()}</span>
              </span>
            </Link>
          )
        );
      })}
    </div>
  );
}
