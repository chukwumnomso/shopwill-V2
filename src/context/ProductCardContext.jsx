import React, { createContext, useContext, useState } from "react";
import UseSupabaseFetch from "../components/supabaseFetch";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [prodCardHover, setProdCardHover] = useState(null);

  const handleCardHover = (id) => {
    setProdCardHover(id);
  };
  const handleCardLeave = () => setProdCardHover(null);

  UseSupabaseFetch("men_new_arrivals", "*", setProducts);

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
