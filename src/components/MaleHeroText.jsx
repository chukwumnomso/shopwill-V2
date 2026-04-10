import React from "react";
import Button from "./Button";

export default function MaleHeroText() {
  return (
    <div className="flex flex-col gap-8   w-full px-2 md:px-4 lg:px-7 justify-center items-start">
      <h1 className="animate-slide-2 font-[jost] text-5xl font-extrabold uppercase md:max-w-[60%]">
        Where elegance meets intention
      </h1>
      <p className="animate-slide-2 text-lg font-[jost] sm:max-w-[60%] md:max-w-[50%]">
        Discover our curated collection of timeless pieces designed for the
        modern era. Each item is crafted with care, blending classic styles with
        contemporary trends.
      </p>

      <Button className="size-12 text-white border-none cursor-pointer hover:bg-white hover:text-black transition-colors duration-500 w-50 bg-black font-[jost] text-xl font-bold animate-slide-3 border-2 border-white">
        Shop Now
      </Button>
    </div>
  );
}
