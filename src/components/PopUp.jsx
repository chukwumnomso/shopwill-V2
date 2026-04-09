import React from "react";
import { usePopUp } from "../context/PopUpContext";

const PopUp = ({ children }) => {
  const { popUp } = usePopUp();
  return (
    <div
      className="fixed h-20    z-50 top-0 left-0 right-0 flex items-center justify-center  duration-500 transition-all"
      style={{
        top: popUp ? "0px" : "-80px ",
      }}
    >
      <div className="w-[70%] bg-[#66CDAA] font-[jost]  text-white text-center h-[80%] flex items-center justify-center uppercase ">
        {children}
      </div>
    </div>
  );
};

export default PopUp;
