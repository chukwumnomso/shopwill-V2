import { useEffect, useRef } from "react";

import Icon from "./Icon";
import { useSearch } from "../context/SearchContext";
import { useModal } from "../context/ModalContext";
import searchResultComponent from "./SearchProductComponent";
import SearchProductComponent from "./SearchProductComponent";

const SearchBar = () => {
  const {
    searchOpen,
    setSearchOpen,
    searchResult,
    searchValue,
    setSearchValue,
  } = useSearch();
  const { setModalOpen } = useModal();
  const searchInputRef = useRef(null);
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <div
      className=" px-4 overflow-y-scroll  w-full  z-50 font-[jost] absolute transition-transform duration-300 bg-white"
      style={{
        transform: searchOpen ? "translateY(0)" : "translateY(-100%)",
        height: searchValue !== "" ? "30rem" : 0,
        display: searchOpen ? "block" : "hidden",
        padding: searchOpen ? "2rem" : 0,
      }}
    >
      <div className="flex justify-between w-full items-center ">
        <div className="flex gap-4 w-full ">
          <Icon name="search" className="size-6 text-gray-500" />

          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            ref={searchInputRef}
            type="text"
            placeholder="search for..."
            className="w-full outline-none uppercase "
          />
        </div>

        <button
          className=" hover:rotate-90 transition-transform duration-500 cursor-pointer"
          onClick={() => {
            setSearchOpen(false);
            setModalOpen(false);
          }}
        >
          <Icon name="cancel" className="size-6 text-gray-500" />
        </button>
      </div>

      {searchValue !== "" && (
        <div className="py-10 ">
          {searchResult.map((productResult) => (
            <SearchProductComponent
              key={productResult.id}
              product={productResult}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
