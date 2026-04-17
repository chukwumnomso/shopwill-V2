import { useState } from "react";
import Icon from "./Icon";
import { useModal } from "../context/ModalContext";
import Button from "./Button";
import { useFilter } from "../context/FilterContext";

const size = ["s", "m", "l", "xl", "xxl"];
const productType = ["accessory", "apparel", "footwear"];

const SideFilter = ({ onClick }) => {
  const [isClicked, setIsClicked] = useState(null);
  const { setModalOpen, setClosedFilter, closedFilter } = useModal(false);
  const { handleProductType } = useFilter();

  const handleClick = (filter) => {
    setIsClicked((prev) => (prev === filter ? null : filter));
  };
  const handleCloseSideFilter = () => {
    setModalOpen(false);
    setClosedFilter(true);
  };

  return (
    <div
      className="bg-white fixed z-50 h-full w-[60%] px-4 font-[jost] uppercase top-0 left-0 pt-10 cursor-pointer overflow-auto text-gray-500 "
      style={{
        transform: closedFilter ? "translateX(-100%)" : "translateX(0)",
        transition: "transform 0.3s linear",
      }}
    >
      <div className="uppercase border-b pb-4 font-bold flex justify-between items-center text-black">
        <p>Filters</p>
        <Button onClick={handleCloseSideFilter}>
          <Icon
            name="cancel"
            className="size-8 hover:rotate-90 transition-transform duration-300 cursor-pointer"
          />
        </Button>
      </div>

      <div className=" py-4 hover:text-black">
        <div
          className="mb-2 flex items-center justify-between"
          onClick={() => handleClick(1)}
        >
          product type
          <div
            className="transition-transform duration-500"
            style={{
              transform: isClicked === 1 ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <Icon name="arrowDown" className="size-5 " />
          </div>
        </div>
        <ul
          className="capitalize flex flex-col gap-2 h-0 overflow-hidden transition-all duration-300"
          style={{ height: isClicked === 1 ? "10rem" : "0" }}
        >
          {productType.map((p, index) => (
            <li
              className="border-b py-2 hover:text-gray-500"
              key={index}
              onClick={() => {
                handleProductType(p);
              }}
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-b py-4 border-t hover:text-black">
        <div
          className="mb-2 flex items-center justify-between"
          onClick={() => handleClick(2)}
        >
          size
          <div
            className="transition-transform duration-300"
            style={{
              transform: isClicked === 2 ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <Icon name="arrowDown" className="size-5 " />
          </div>
        </div>
        <ul
          className="uppercase flex flex-col gap-2 h-0 overflow-hidden transition-all duration-300"
          style={{ height: isClicked === 2 ? "15rem" : "0" }}
        >
          {size.map((s, index) => (
            <li
              className="border-b py-2 hover:text-gray-500"
              key={index}
              onClick={() => {
                onClick(s);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideFilter;
