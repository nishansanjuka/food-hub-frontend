"use client";

import * as React from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  useIsOpenCart,
  useUpdateIsOpenCart,
} from "./context-hooks/add-to-cart-context";

export default function PopDrawer({
  children,
  open,
  setOpen,
  title,
  description,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  title: string;
  description: string;
}) {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const setIsOpen = useUpdateIsOpenCart();
  const isOpen = useIsOpenCart();

  React.useEffect(() => {
    open = isOpen;
    setOpen = setIsOpen;
  }, [setIsOpen , isOpen]);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" sm:w-fit sm:max-w-[650px] xl:max-w-[700px] px-10">
          <DialogHeader>
            <DialogTitle className=" text-2xl">{title}</DialogTitle>
            <DialogDescription className=" text-sm">
              {description}
            </DialogDescription>
          </DialogHeader>
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">{children}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
