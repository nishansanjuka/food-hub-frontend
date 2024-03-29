import { Frame } from "@/components/frame";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeliveryForm from "./delivery-form";

export default function PersonalInformations() {
  return (
    <div className="h-screen">
      <ScrollArea className=" xl:pb-5 hidden xl:block h-screen">
        {/* flex w-full h-screen items-center justify-center */}
        <div className="">
          <div className="grid w-full items-center grid-cols-2 justify-center sm:mt-40 xl:px-10 2xl:px-20">
            <Frame
              title={"Delivery Informations."}
              description={
                "The section where you put information about your sorroundings."
              }
            >
              <DeliveryForm />
            </Frame>
          </div>
        </div>
      </ScrollArea>

      <ScrollArea className="p-5 h-screen xl:hidden block pt-40">
        <div className="w-full flex flex-col space-y-10 xl:space-y-20 sm:mt-40">
          <div>
            <h1 className=" text-2xl sm:text-6xl font-medium text-foreground">
            Delivery Informations.
            </h1>
            <p className="  text-sm sm:text-xl text-foreground/80">
            The section where you put information about your sorroundings.
            </p>
          </div>
          <DeliveryForm />
        </div>
      </ScrollArea>
    </div>
  );
}
