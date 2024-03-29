import CheckoutForm from "@/components/checkout-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OrderCheckOut() {
  return (
    <div className="h-screen w-full">
      <ScrollArea
       className=" w-full sm:p-20 h-screen">
        <CheckoutForm/>
      </ScrollArea>
    </div>
  );
}
