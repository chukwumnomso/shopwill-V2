import React from "react";
import Icon from "./Icon";

const MobileNavSlide = ({
  head,
  Tshirts,
  Pants,
  Shorts,
  Hoodies,
  Accessories,
  style,
  onClick,
}) => {
  return (
    <div
      className="bg-white text-black font-[jost] cursor-pointer   absolute top-0 left-0 w-full mt-40 px-4"
      style={style}
    >
      <ul>
        <li
          className="flex items-center border-b text-gray-500 h-15 hover:text-black"
          onClick={onClick}
        >
          <Icon name="chevronLeft" className="size-5 " />
          <span>{head}</span>
        </li>
        <li className="flex items-center border-b  h-15">{Tshirts}</li>
        <li className="flex items-center border-b  h-15">{Pants}</li>
        <li className="flex items-center border-b h-15">{Shorts}</li>
        <li className="flex items-center border-b  h-15">{Hoodies}</li>
        <li className="flex items-center border-b  h-15">{Accessories}</li>
      </ul>
    </div>
  );
};

export default MobileNavSlide;
