import React, { createContext, useContext, useState } from "react";
import SupabaseFetch from "../components/useSupabaseFetch";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [prodCardHover, setProdCardHover] = useState(null);

  const handleCardHover = (id) => {
    setProdCardHover(id);
  };

  const handleCardLeave = () => setProdCardHover(null);

  // SupabaseFetch("women_new_arrival", "*", setProducts);

  return (
    <ProductContext.Provider
      value={{ products, handleCardHover, handleCardLeave, prodCardHover }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useProduct() {
  const context = useContext(ProductContext);

  return context;
}
