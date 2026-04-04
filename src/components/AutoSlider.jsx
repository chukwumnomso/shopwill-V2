import React from "react";
import { useState, useEffect } from "react";

import Button from "./Button";

const AutoSlider = ({ images, interval = 3000, autoPlay = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  if (!images || images.length === 0) {
    return <div>No images to display</div>;
  }

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, autoPlay, isPaused]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "fill",
            transition: "opacity 0.5s ease-in-out",
            inset: 0,
            opacity: index === currentIndex ? 1 : 0,
          }}
        />
      ))}
      <Button
        onClick={goToPrevious}
        bg="absolute left-[0.625rem] top-1/2 -translate-y-1/2 z-20 bg-[rgba(0,0,0,0.5)] text-white border-none p-2.5 cursor-pointer rounded-full"
      >
        ❮
      </Button>
      <Button
        onClick={goToNext}
        bg="absolute right-[0.625rem] top-1/2 -translate-y-1/2 z-20 bg-[rgba(0,0,0,0.5)] text-white border-none p-2.5 cursor-pointer rounded-full"
      >
        ❯
      </Button>
    </div>
  );
};

AutoSlider.defaultProps = {
  interval: 3000,
  autoPlay: true,
};

export default AutoSlider;
