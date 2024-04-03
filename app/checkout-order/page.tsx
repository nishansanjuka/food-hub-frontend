import CheckoutForm from "@/components/checkout-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OrderCheckOut({params , searchParams : {checkout}} : {params : any , searchParams : {checkout : "yes" | "no"}}) {

  return (
    <div className="h-screen w-full">
      <ScrollArea
       className=" p-5 md:p-10 xl:p-0 w-full h-screen">
        <CheckoutForm checkout={checkout === 'yes' ? true : false}/>
      </ScrollArea>
    </div>
  );
}
