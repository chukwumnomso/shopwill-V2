import React from "react";
import Icon from "./Icon";
import { Link } from "react-router-dom";

const MenMobileNavSlide = ({
  head,
  Tshirts,
  Pants,
  Shorts,
  Hoodies,
  Accessories,
  style,
  handleActiveNav,
  handleCategory,
}) => {
  const path = "/products";
  return (
    <div
      className="bg-white text-black font-[jost] cursor-pointer   absolute top-0 left-0 w-full mt-40 px-4"
      style={style}
    >
      <ul>
        <li
          className="flex items-center border-b text-gray-500 h-15 hover:text-black"
          onClick={handleActiveNav}
        >
          <Icon name="chevronLeft" className="size-5 " />
          <span>{head}</span>
        </li>
        <li
          className="flex items-center border-b  h-15"
          onClick={() => {
            handleCategory(path, "male", "t-shirt");
          }}
        >
          {Tshirts}
        </li>
        <li
          className="flex items-center border-b  h-15"
          onClick={() => {
            handleCategory(path, "male", "pant");
          }}
        >
          {Pants}
        </li>
        <li
          className="flex items-center border-b h-15"
          onClick={() => handleCategory(path, "male", "short")}
        >
          {Shorts}
        </li>
        <li
          className="flex items-center border-b  h-15"
          onClick={() => handleCategory(path, "male", "hoodie")}
        >
          {Hoodies}
        </li>
        <li className="flex items-center border-b  h-15">{Accessories}</li>
      </ul>
    </div>
  );
};

const WomenMobileNavSlide = ({
  Head,
  Top,
  Leggings,
  Skirt,
  Hoodie,
  Bag,
  style,
  handleActiveNav,
  handleCategory,
}) => {
  const path = "/products";
  return (
    <div
      className="bg-white text-black font-[jost] cursor-pointer   absolute top-0 left-0 w-full mt-40 px-4"
      style={style}
    >
      <ul>
        <li
          className="flex items-center border-b text-gray-500 h-15 hover:text-black"
          onClick={handleActiveNav}
        >
          <Icon name="chevronLeft" className="size-5 " />
          <span>{Head}</span>
        </li>
        <li
          className="flex items-center border-b  h-15"
          onClick={() => handleCategory(path, "female", "top")}
        >
          {Top}
        </li>
        <li
          className="flex items-center border-b  h-15"
          onClick={() => handleCategory(path, "female", "leggings")}
        >
          {Leggings}
        </li>
        <li
          className="flex items-center border-b h-15"
          onClick={() => handleCategory(path, "female", "skirt")}
        >
          {Skirt}
        </li>
        <li
          className="flex items-center border-b  h-15"
          onClick={() => handleCategory(path, "female", "hoodie")}
        >
          {Hoodie}
        </li>
        <li
          className="flex items-center border-b  h-15"
          onClick={() => handleCategory(path, "female", "bag")}
        >
          {Bag}
        </li>
      </ul>
    </div>
  );
};

export { MenMobileNavSlide, WomenMobileNavSlide };
