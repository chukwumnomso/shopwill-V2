import { useSearchParams } from "react-router-dom";
import { createContext, useContext } from "react";

const SortContext = createContext();

const SortProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "";
  const asc = searchParams.get("asc") || "";
  const isAscending = asc === "true";

  const handleSort = (newSort, boolen) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sort: newSort,
      asc: boolen,
      page: 1,
    });
  };

  return (
    <SortContext.Provider value={{ handleSort, isAscending, sort, asc }}>
      {children}
    </SortContext.Provider>
  );
};

const useSort = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSort must be used within SortProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useSort, SortProvider };
