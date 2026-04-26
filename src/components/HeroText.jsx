import React from "react";
import Button from "./Button";

export default function HeroText() {
  return (
    <div className="flex flex-col gap-8 absolute h-full w-full px-2 md:px-4 lg:px-7 justify-center items-start  text-white bg-linear-to-b from-black/10 to-black/80 md:flex-row md:items-center md:justify-center md:gap-2">
      <h1 className="animate-slide-2 font-[jost] text-5xl font-extrabold uppercase md:max-w-[60%]md:text-5xl tracking-widest ">
        drip like you mean it, wear your attitude.
      </h1>
      <div>
        <p className="animate-slide-2 text-lg font-[jost]  max-w-[80%] sm:max-w-[60%] md:max-w-full md:text-xl tracking-wider">
          Where street meets style, you are the trend. Shop the hottest picks
          now & make a statement.
        </p>

        <Button className="size-12 text-white border-none cursor-pointer hover:bg-white hover:text-black transition-colors duration-500 w-50 bg-black font-[jost] text-xl font-bold animate-slide-3 border-2 border-white md:w-full ">
          Shop Now
        </Button>
      </div>
    </div>
  );
}
