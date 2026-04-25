import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../components/supabaseClient";
import { useSearchParams } from "react-router-dom";
import { useModal } from "./ModalContext";
import { useUrlParams } from "./UrlParamsContext";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const { setSearchParams, gender } = useUrlParams();

  const [productType, setProductType] = useState({});
  const [productSize, setProductSize] = useState({});
  const { setModalOpen, setFilterOpen } = useModal();

  const handleFilter = (newFilter, filter) => {
    setSearchParams((prev) => {
      const currentFilter = prev.getAll(filter);
      if (currentFilter.includes(newFilter)) {
        prev.delete(filter, newFilter);
      } else {
        prev.append(filter, newFilter);
      }
      prev.set("page", "1");
      return prev;
    });
    setModalOpen(false);
    setFilterOpen(false);
  };

  const handleReset = (filter) => {
    setSearchParams((prev) => {
      prev.delete(filter);
      prev.set("page", "1");
      return prev;
    });
    setModalOpen(false);
    setFilterOpen(false);
  };

  const removeFilter = (filter, removedFilter) => {
    setSearchParams((prev) => {
      const currentFilter = prev.getAll(filter);
      if (currentFilter.includes(removedFilter)) {
        prev.delete(filter, removedFilter);
        prev.set("page", "1");
      }
      return prev;
    });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data, error } = await supabase
          .from("products_store")
          .select("category,sizes")
          .eq("gender", gender);

        if (!error && data) {
          const counts = data.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
          }, {});
          setProductType(counts);

          const allSizesFound = data
            .map((item) => item.sizes)
            .filter((val) => val !== null && val !== undefined)
            .flat();

          const sizeCounts = allSizesFound.reduce((acc, size) => {
            const key = size;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
          }, {});

          setProductSize(sizeCounts);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [gender]);

  return (
    <FilterContext.Provider
      value={{
        handleFilter,
        productType,
        setProductType,
        productSize,
        handleReset,
        removeFilter,
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
