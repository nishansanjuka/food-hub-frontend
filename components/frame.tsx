"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";

export function Frame({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className=" flex col-span-2 w-full">
      <div className=" p-5 mt-5">
        <h1 className=" xl:text-2xl 2xl:text-4xl mb-2">{title}</h1>
        <p className="xl:text-sm 2xl:text-lg text-muted-foreground">{description}</p>
      </div>
      <Card className="w-full border-border h-fit xl:p-10 bg-primary/5">
        <CardHeader className=" xl:hidden">
          <CardTitle className=" xl:text-2xl 2xl:text-4xl">{title}</CardTitle>
          <CardDescription className=" xl:text-sm 2xl:text-lg">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
