"use client";
import {icons as Icons} from 'lucide-react'

export default function loading() {
  return (
    <main className="fixed z-50 top-0 left-0 w-full h-screen bg-background flex-col space-x-1 sm:space-y-5 flex items-center justify-center">
      <Icons.Loader className=' animate-spin text-primary w-5 h-5 sm:w-8 sm:h-8'/>
      <p className=" text-primary text-sm sm:text-4xl font-bold">loading</p>
    </main>
  );
}
