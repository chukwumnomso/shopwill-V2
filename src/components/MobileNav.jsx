import { useEffect, useState } from "react";
import MobileNavSlide from "./MobileNavSlide";
import Icon from "./Icon";
import ShopLogo from "./ShopLogo";
import { useNavBar } from "../context/NavBarContext";

const MobileNav = () => {
  const {
    navSlide,
    toggleNavSlide,
    setActiveNav,
    activeNav,
    navOpen,
    setNavOpen,
  } = useNavBar();

  const handleActiveNav = () => {
    toggleNavSlide("");
    setActiveNav((prev) => !prev);
  };

  return (
    <>
      <div
        className="h-full text-black bg-white fixed z-50 w-[85%] top-0 left-0 overflow-y-auto capitalize font-[jost] pt-5 px-4 overflow-x-hidden"
        style={{
          transform: navOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className="mb-20 flex items-center justify-between uppercase ">
          menu
          <ShopLogo />
          <button onClick={() => setNavOpen(false)}>
            <Icon
              name="cancel"
              className="size-10  cursor-pointer hover:rotate-90 transition-transform duration-300"
            />
          </button>
        </div>

        {/* ////////////////////////////////////////// */}
        <div
          className="bg-white text-black font-[jost] cursor-pointer"
          style={{
            opacity: activeNav ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <ul>
            <li
              className="flex items-center justify-between border-b h-15 hover:text-gray-500"
              onClick={() => {
                toggleNavSlide("best seller");
              }}
            >
              best seller
              <Icon name="chevronRight" className="size-5 " />
            </li>
            <li
              className="flex items-center justify-between     border-b text-black h-15 hover:text-gray-500"
              onClick={() => {
                toggleNavSlide("men");
              }}
            >
              <span>men</span>
              <Icon name="chevronRight" className="size-5 " />
            </li>
            <li
              className="flex items-center justify-between    border-b  h-15 hover:text-gray-500"
              onClick={() => {
                toggleNavSlide("women");
              }}
            >
              women
              <Icon name="chevronRight" className="size-5 " />
            </li>
            <li
              className="flex items-center justify-between  border-b  h-15 hover:text-gray-500"
              onClick={() => {
                toggleNavSlide("kids");
              }}
            >
              kids
              <Icon name="chevronRight" className="size-5 " />
            </li>
          </ul>
        </div>

        <MobileNavSlide
          style={{
            transform:
              navSlide === "best seller" ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
          }}
          head="best seller"
          Tshirts="T-shirts"
          Pants="Pants"
          Shorts="Shorts"
          Hoodies="Hoodies"
          onClick={handleActiveNav}
          Accessories="Accessories"
        />

        <MobileNavSlide
          style={{
            transform:
              navSlide === "men" ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
          }}
          head="Men"
          Tshirts="T-shirts"
          Pants="Pants"
          Shorts="Shorts"
          Hoodies="Hoodies"
          Accessories="Accessories"
          onClick={handleActiveNav}
        />

        <MobileNavSlide
          style={{
            transform:
              navSlide === "women" ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
          }}
          head="Women"
          Tshirts="T-shirts"
          Pants="Pants"
          Shorts="Shorts"
          Hoodies="Hoodies"
          Accessories="Accessories"
          onClick={handleActiveNav}
        />
        <MobileNavSlide
          style={{
            transform:
              navSlide === "kids" ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
          }}
          head="Kids"
          Tshirts="T-shirts"
          Pants="Pants"
          Shorts="Shorts"
          Hoodies="Hoodies"
          Accessories="Accessories"
          onClick={handleActiveNav}
        />
      </div>
    </>
  );
};

export default MobileNav;
