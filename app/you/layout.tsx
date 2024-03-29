import HeaderSection from "@/components/header-section";
import YouHeader from "@/components/layout/header-you";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function YouLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className=" w-full">
        <div className=" relative flex w-full flex-col max-h-screen">
          <YouHeader />
          <main className="">{children}</main>
        </div>
      </div>
    </>
  );
}
