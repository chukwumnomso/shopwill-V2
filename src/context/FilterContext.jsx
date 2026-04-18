import { createContext, useContext, useState } from "react";
import { useModal } from "./ModalContext";
import { useCategory } from "./CategoryContext";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const { setModalOpen, setClosedFilter } = useModal();
  const { setCategory } = useCategory();
  const [currentPage, setCurrentPage] = useState(1);

  const handleProductType = (product_type) => {
    setModalOpen(false);
    setClosedFilter(true);
    setCurrentPage(1);
    setCategory(product_type);
  };

  return (
    <FilterContext.Provider
      value={{
        handleProductType,
        setCurrentPage,
        currentPage,
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
