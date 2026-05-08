import { useSearchParams } from "react-router-dom";
import { createContext, useContext } from "react";
import { useModal } from "./ModalContext";

const SearchContext = createContext();

const SearchParamsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setModalOpen, setClosedFilter } = useModal();
  const currentPage = Number(searchParams.get("page")) || 1;
  const gender = searchParams.get("gender") || "";
  const sort = searchParams.get("sort") || "";
  const asc = searchParams.get("asc") || true;
  const isAscending = asc === "true";
  const searchQuery = searchParams.get("q") || "";
  const category = searchParams.getAll("cat") || [];
  const sizes = searchParams.getAll("size") || [];

  const handleSort = (newSort, boolen) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sort", newSort);
      newParams.set("asc", boolen);
      newParams.set("page", "1");
      return newParams;
    });
  };

  const handleCategory = (newCat) => {
    setSearchParams((prev) => {
      (prev.set("cat", newCat), prev.set("page", "1"));
      return prev;
    });
    setModalOpen(false);
    setClosedFilter(true);
  };

  return (
    <SearchContext.Provider
      value={{
        handleSort,
        isAscending,
        sort,
        asc,
        handleCategory,
        searchParams,
        setSearchParams,
        gender,
        category,
        currentPage,
        searchQuery,
        sizes,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useUrlParams = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useParams must be used within searchParams provider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useUrlParams, SearchParamsProvider };
