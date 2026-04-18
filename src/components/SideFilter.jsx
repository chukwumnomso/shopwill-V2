import supabase from "./supabaseClient";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import { useModal } from "../context/ModalContext";
import Button from "./Button";
import { useFilter } from "../context/FilterContext";

// const productType = ["accessory", "apparel", "footwear"];
// const gender = ["male", "female", "unisex"];

const SideFilter = ({ gender }) => {
  const [isClicked, setIsClicked] = useState(null);
  const [productType, setProductType] = useState(null);
  const [quantity, setQuantity] = useState("");
  const { setModalOpen, setClosedFilter, closedFilter } = useModal(false);
  const { handleProductType } = useFilter();

  useEffect(() => {
    const fetchProductType = async () => {
      const { data, error } = await supabase
        .from("products_store")
        .select("category")
        .eq("gender", gender);
      if (!error) {
        const prodType = data?.map((type) => type.category);
        const newProdType = [...new Set(prodType)];
        setProductType(newProdType);
        const productCount = prodType.reduce((acc, prod) => {
          acc[prod] = (acc[prod] || 0) + 1;
          return acc;
        }, {});
        setQuantity(productCount);
      }
    };
    fetchProductType();
  }, [gender]);

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
          style={{ height: isClicked === 1 ? "25rem" : "0" }}
        >
          {productType?.map((prod_type, index) => (
            <li
              className="border-b py-2 hover:text-gray-500"
              key={index}
              onClick={() => {
                handleProductType(prod_type);
              }}
            >
              {prod_type} <span>({quantity[prod_type]})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideFilter;
