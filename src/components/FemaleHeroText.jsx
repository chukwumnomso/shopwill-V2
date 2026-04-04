import React from "react";
import Button from "./Button";

export default function FemaleHeroText() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <h1 className="animate-slide-2 font-[playfair] text-4xl font-extrabold">
        WOMEN STORE
      </h1>
      <div className="animate-slide-3 h-15 w-55  border-white border-2 flex items-center justify-center rounded-xl hover:bg-white hover:text-black transition-colors duration-300">
        <Button className="btn-hover bg-grey-300 border border-white rounded-lg h-13 w-53 font-[playfair] text-2xl font-bold cursor-pointer">
          Shop Now
        </Button>
      </div>
    </div>
  );
}
