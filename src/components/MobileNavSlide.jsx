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
  return (
    <div
      className="bg-white text-black font-[jost] cursor-pointer   absolute top-0 left-0 w-full mt-40 px-4"
      style={style}
    >
      <Link to="/menproducts">
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
            onClick={() => handleCategory("t-shirt")}
          >
            {Tshirts}
          </li>
          <li
            className="flex items-center border-b  h-15"
            onClick={() => handleCategory("pant")}
          >
            {Pants}
          </li>
          <li
            className="flex items-center border-b h-15"
            onClick={() => handleCategory("short")}
          >
            {Shorts}
          </li>
          <li
            className="flex items-center border-b  h-15"
            onClick={() => handleCategory("hoodie")}
          >
            {Hoodies}
          </li>
          <li className="flex items-center border-b  h-15">{Accessories}</li>
        </ul>
      </Link>
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
  return (
    <div
      className="bg-white text-black font-[jost] cursor-pointer   absolute top-0 left-0 w-full mt-40 px-4"
      style={style}
    >
      <Link to="/womenproducts">
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
            onClick={() => handleCategory("top")}
          >
            {Top}
          </li>
          <li
            className="flex items-center border-b  h-15"
            onClick={() => handleCategory("leggings")}
          >
            {Leggings}
          </li>
          <li
            className="flex items-center border-b h-15"
            onClick={() => handleCategory("skirt")}
          >
            {Skirt}
          </li>
          <li
            className="flex items-center border-b  h-15"
            onClick={() => handleCategory("hoodie")}
          >
            {Hoodie}
          </li>
          <li
            className="flex items-center border-b  h-15"
            onClick={() => handleCategory("bag")}
          >
            {Bag}
          </li>
        </ul>
      </Link>
    </div>
  );
};

export { MenMobileNavSlide, WomenMobileNavSlide };
