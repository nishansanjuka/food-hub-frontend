"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { NavItem } from "@/constants/data";
import { icons as Icons } from "lucide-react";
import { ThemesMenu } from "./themes-menu";



interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();
  
  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2 mt-5 sm:mt-10">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "ArrowRight"];
        return (
          item.href && (
            <Link
              key={index}
              href={item.disabled ? "/" : item.href}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
            >
              <span
                className={cn(
                  "before:content-[' '] group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path.split('/')[1] === item.href.split('/')[1] ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
                
              >
                <Icon className="mr-2 h-4 w-4 sm:w-5 sm:h-5" />
                <span className=" xl:text-md">{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
      <ThemesMenu/>
    </nav>
  );
}
