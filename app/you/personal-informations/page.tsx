import { Frame } from "@/components/frame";
import BioForm from "./bio-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PersonalInformations() {
  return (
    <div className="h-screen">
      <ScrollArea className=" xl:pb-5 hidden xl:block h-screen">
        {/* flex w-full h-screen items-center justify-center */}
        <div className="">
          <div className="grid w-full items-center grid-cols-2 justify-center sm:mt-40 xl:px-10 2xl:px-20">
            <Frame
              title={"Personal Informations."}
              description={
                "The section where you put your identification information so we can know you."
              }
            >
              <BioForm />
            </Frame>
          </div>
        </div>
      </ScrollArea>

      <ScrollArea className="p-5 h-screen xl:hidden block pt-40">
        <div className="w-full flex flex-col space-y-10 xl:space-y-20 sm:mt-40">
          <div>
            <h1 className=" text-2xl sm:text-6xl font-medium text-foreground">
              Personal Informations.
            </h1>
            <p className="  text-sm sm:text-xl text-foreground/80">
              The section where you put your identification information so we
              can know you.
            </p>
          </div>
          <BioForm />
        </div>
      </ScrollArea>
    </div>
  );
}
