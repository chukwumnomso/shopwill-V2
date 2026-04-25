import supabase from "./supabaseClient";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import { useModal } from "../context/ModalContext";
import Button from "./Button";
import { useFilter } from "../context/FilterContext";
import { useUrlParams } from "../context/UrlParamsContext";

const SideFilter = () => {
  const [isClicked, setIsClicked] = useState(null);
  const { setModalOpen, setFilterOpen, filterOpen } = useModal();
  const { productType, productSize } = useFilter();
  const openAccordion = (filter) => {
    setIsClicked((prev) => (prev === filter ? null : filter));
  };

  const closeFilterDrawer = () => {
    setFilterOpen(false);
    setModalOpen(false);
  };

  return (
    <div
      className={`bg-white w-[80%] fixed h-full z-50 top-0 left-0 font-[jost] ${filterOpen ? "translate-x-0" : "-translate-x-full"} transition-transform ease-in-out duration-300 `}
    >
      <div className="flex items-center justify-between px-6 border-b  border-gray-500 h-20 text-xl">
        <span className="font-[jost] uppercase tracking-widest">filter</span>
        <button
          onClick={closeFilterDrawer}
          className="hover:rotate-90 transition-transform duration-300 cursor-pointer"
        >
          <Icon name="cancel" className="size-7" />
        </button>
      </div>

      <FilterAccordion
        data={productType}
        onClick={openAccordion}
        isClicked={isClicked}
        heading={"product types"}
      />
      <FilterAccordion
        data={productSize}
        onClick={openAccordion}
        isClicked={isClicked}
        heading={"size"}
      />
    </div>
  );
};

export default SideFilter;

const FilterAccordion = ({ isClicked, onClick, data, heading }) => {
  const { setModalOpen, setFilterOpen } = useModal();
  const { handleCategory } = useFilter();
  const { setSearchParams } = useUrlParams();
  return (
    <div>
      <div
        className={` tracking-widest mx-4 cursor-pointer  `}
        onClick={() => {
          onClick(heading);
        }}
      >
        <div className="uppercase py-4  flex items-center justify-between text-sm">
          <p>{heading}</p>
          <Icon
            name="arrowDown"
            className={`size-5 ${isClicked !== heading ? "rotate-0" : "rotate-180"} transition-transform duration-500 `}
          />
        </div>
      </div>
      <div
        className={`${isClicked !== heading ? "max-h-0" : "max-h-600"} cursor-pointer transition-all duration-500 border-b border-gray-300 mx-4 tracking-widest overflow-hidden`}
      >
        <ul
          className={`uppercase text-xs mb-3 flex flex-col gap-4 text-gray-600 py-2 ${isClicked !== heading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
        >
          <li
            onClick={() => {
              setModalOpen(false);
              setFilterOpen(false);
              setSearchParams((prev) => {
                prev.set("cat", "");
                return prev;
              });
            }}
          >
            all
          </li>
          {Object.entries(data).map(([name, count]) => (
            <li key={name} onClick={() => handleCategory(name)}>
              {name} ({count})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
