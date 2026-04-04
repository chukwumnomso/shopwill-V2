import React from "react";
import AutoSlider from "./AutoSlider";
import OverLay from "./OverLay";
import MaleHeroText from "./MaleHeroText";
import FemaleHeroText from "./FemaleHeroText";

const maleImageModules = import.meta.glob(
  "../assets/images/hero-images/male/*.{png,jpg,jpeg,gif,svg}",
  { eager: true },
);
const femaleImageModules = import.meta.glob(
  "../assets/images/hero-images/female/*.{png,jpg,jpeg,gif,svg}",
  { eager: true },
);

const maleImages = Object.values(maleImageModules).map((img) => img.default);
const femaleImages = Object.values(femaleImageModules).map(
  (img) => img.default,
);

export default function Hero() {
  return (
    <div className="flex flex-col gap-1 overflow-hidden">
      <MaleSlider />
      <FemaleSlider />
    </div>
  );
}

// components of the Hero component
const MaleSlider = () => {
  return (
    <div className="relative h-[calc(100vh-6rem)] flex items-center justify-center hover:scale-101 transition-transform duration-300">
      <AutoSlider images={maleImages} interval={5000} />
      <OverLay>
        <MaleHeroText />
      </OverLay>
    </div>
  );
};

const FemaleSlider = () => {
  return (
    <div className="relative h-[calc(100vh-6rem)] flex items-center justify-center  hover:scale-101 transition-transform duration-300">
      <AutoSlider images={femaleImages} interval={5500} />
      <OverLay>
        <FemaleHeroText />`
      </OverLay>
      `
    </div>
  );
};
