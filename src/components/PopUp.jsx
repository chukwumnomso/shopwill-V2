import React from "react";
import { usePopUp } from "../context/PopUpContext";

const PopUp = ({ children }) => {
  const { popUpVisible } = usePopUp();
  return (
    <div
      className="fixed h-30  z-50 top-0 left-0 right-0 flex items-center justify-center  duration-500 transition-all"
      style={{
        top: popUpVisible ? "0px" : "-100% ",
      }}
    >
      <div className="w-[90%] bg-black font-[jost]  text-white text-center h-[80%] flex items-center justify-center capitalize text-lg">
        {children}
      </div>
    </div>
  );
};

export default PopUp;
