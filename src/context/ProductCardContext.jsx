import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products] = useState([]);
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
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}
