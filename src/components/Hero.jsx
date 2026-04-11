import React from "react";
import AutoSlider from "./AutoSlider";
import HeroText from "./HeroText";

const imageModules = import.meta.glob(
  "../assets/images/hero-images/heroImages/*.{png,jpg,jpeg,gif,svg}",
  { eager: true },
);

const images = Object.values(imageModules).map((img) => img.default);

export default function Hero() {
  return (
    <div>
      <HeroSlider />
    </div>
  );
}

// components of the Hero component
const HeroSlider = () => {
  return (
    <div className=" relative h-[calc(100vh-6rem)] w-full flex items-center  justify-center   sm:h-[calc(100vh+6rem)] md:h-[calc(100vh+9rem)] lg:h-[calc(100vh+12rem)]">
      <AutoSlider images={images} interval={5000} />
      <HeroText />
    </div>
  );
};
