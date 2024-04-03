"use client";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
import { icons as Icons } from "lucide-react";
import { useTheme } from "next-themes";
export function ThemesMenu({width = 'w-full'} : {width? : string}) {

  const { setTheme } = useTheme();

  return (
    <div
      tabIndex={0}
      className={cn(" outline-none border-none flex justify-between items-center rounded-md" , width)}
    >
      <Menubar className=" outline-none border-none w-full rounded-md">
        <MenubarMenu>
          <MenubarTrigger
            className={cn(" xl:text-md w-full py-2 px-3 outline-none")}
          >
            <Icons.SwatchBook className="mr-2 h-4 w-4 sm:w-5 sm:h-5" />
            {width === 'w-full' && <div className=" flex items-center justify-between w-full">
              <p className=" text-base md:text-sm">Themes</p>
              <Icons.ChevronRight />
            </div>}
          </MenubarTrigger>

          <MenubarContent className=" border-border">
            <MenubarItem onClick={() => setTheme("light")} className=" cursor-pointer flex space-x-2 xl:text-md">
              <Icons.Sun className=" w-4 h-4 sm:w-5 sm:h-5 " />
              <p>Light</p>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => setTheme("dark")} className=" flex space-x-2 xl:text-md cursor-pointer">
              <Icons.MoonStar className=" w-4 h-4 sm:w-5 sm:h-5 " />
              <p>Dark</p>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => setTheme("system")} className=" flex space-x-2 xl:text-md cursor-pointer">
              <Icons.Palette className=" w-4 h-4 sm:w-5 sm:h-5 " />
              <p>System</p>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
