// contexts/SortContext.jsx
import { createContext, useContext, useState } from "react";
import { useFilter } from "./FilterContext";

const SortContext = createContext();

const SortProvider = ({ children }) => {
  const { setCurrentPage } = useFilter();
  const [sortConfig, setSortConfig] = useState({
    field: "created_at",
    ascending: false,
  });

  const sortProducts = (field, ascending) => {
    setSortConfig({ field, ascending });
    setCurrentPage(1);
  };

  return (
    <SortContext.Provider value={{ sortConfig, sortProducts }}>
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
