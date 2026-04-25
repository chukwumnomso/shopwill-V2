import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Icon from "./Icon";
import { useSearch } from "../context/SearchContext";
import { useModal } from "../context/ModalContext";
import SearchProductComponent from "./SearchProductComponent";

import Loading from "../components/SmallLoadingSpinner";
import Button from "./Button";

const SearchBar = () => {
  const {
    searchOpen,
    setSearchOpen,
    setSearchParams,
    handleSearch,
    searchQuery,
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
      className={` fixed bg-white w-full  flex items-center justify-between px-4 ${searchOpen ? "translate-y-0" : "-translate-y-200"} ${searchOpen ? "z-40" : "z-10"} transition-transform duration-300`}
    >
      <div className="flex items-center gap-4  w-full h-10">
        <Icon name="search" className="size-6" />
        <input
          value={searchQuery}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          ref={searchInputRef}
          type="text"
          placeholder="search for.."
          className="uppercase focus:outline-0 w-full"
        />
      </div>
      <button
        className="hover:rotate-90 transition-transform duration-300 cursor-pointer"
        onClick={() => {
          setSearchOpen((prev) => !prev);
          setModalOpen((prev) => !prev);
          setSearchParams((prev) => {
            prev.delete("q");
            return prev;
          });
        }}
      >
        <Icon name="cancel" className="size-6" />
      </button>
    </div>
  );
};

export default SearchBar;
