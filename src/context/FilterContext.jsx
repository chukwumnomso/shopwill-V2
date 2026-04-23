import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useModal } from "./ModalContext";
import { useCategory } from "./CategoryContext";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const { setModalOpen, setClosedFilter } = useModal();

  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("cat") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const handleCategory = (newCat) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      cat: newCat,
      page: 1,
    });
    setModalOpen(false);
    setClosedFilter(true);
  };

  return (
    <FilterContext.Provider
      value={{
        handleCategory,
        category,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => {
  const context = useContext(FilterContext);
  if (!FilterContext) throw new Error("must be used under filter provider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useFilter, FilterProvider };
