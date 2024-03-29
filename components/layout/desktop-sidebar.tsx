"use client";
import { DashboardNav } from "@/components/dashboard-nav";
import { Resturant, navItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { icons as Icon } from "lucide-react";
import {usePathname} from 'next/navigation';

export default function DesktopSideBar() {

  const pathName = usePathname();
  return (
    <nav className={cn(`relative hidden h-screen border-r border-border sm:w-1/2 xl:w-1/3 2xl:w-1/4  ${pathName === '/' ? 'md:hidden' : 'md:block'}`)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <div className="mb-8 p-2">
              <Link
                className="flex items-center space-x-2"
                href={"https://localhost:3000"}
                target="_blank"
              >
                <div>
                  <Icon.Citrus className="mr-2 size-8 text-primary" />
                </div>

                <h1 className="text-lg font-bold">{Resturant.name}</h1>
              </Link>
            </div>

            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>{" "}
    </nav>
  );
}
