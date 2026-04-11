import Button from "./Button";
import { useState } from "react";
import ShopLogo from "./ShopLogo";
import Icon from "./Icon";
import MobileNavAccordion from "./MobileNavAccordion";
import { useNavBar } from "../context/NavBarContext";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(null);
  const { isMenuOpen, setIsMenuOpen } = useNavBar();

  return (
    <div
      className="w-[60%] h-full bg-white fixed top-0 left-0 z-50 transition-transform duration-700 ease-in-out shadow-lg"
      style={{
        transform: isMenuOpen ? "translateX(-100%)" : null,
      }}
    >
      <div className="h-20 border-b flex items-center justify-between px-4 mb-15 ">
        <ShopLogo />
        <Button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="bg-transparent  size-10 p-0"
        >
          <Icon
            name="cancel"
            className="size-10 text-gray-400 absolute top-5 right-5 cursor-pointer  hover:rotate-90 transition-transform duration-300 flex justify-center items-center"
          />
        </Button>
      </div>

      <MobileNavAccordion
        setIsMenuOpen={setIsMenuOpen}
        index={1}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="best seller"
        item={{ footwear: "Footwear" }}
      />

      <MobileNavAccordion
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        index={2}
        shirt="Shirts"
        pants="Pants"
        shoes="Shoes"
        title="men"
        item={{ footwear: "Footwear" }}
      />

      <MobileNavAccordion
        index={3}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        shirt="Shirts"
        pants="Pants"
        shoes="Shoes"
        title="women"
        item={{ footwear: "Footwear" }}
      />

      <MobileNavAccordion
        index={4}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="kids"
        shirt="Shirts"
        pants="Pants"
        shoes="Shoes"
        item={{ footwear: "Footwear" }}
      />

      <Button className="w-full h-10 bg-black text-white font-bold font-[jost] mt-10 hover:text-gray-400 transition-colors duration-300 cursor-pointer absolute bottom-5 left-0">
        LOGIN
      </Button>
    </div>
  );
};

export default MobileNav;
