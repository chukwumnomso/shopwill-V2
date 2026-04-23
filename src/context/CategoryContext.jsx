import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState();

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error("must be use within Category provider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useCategory, CategoryProvider };
