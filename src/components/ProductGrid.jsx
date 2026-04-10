import { useEffect } from "react";

import ProdCard from "./ProductCard";
import useSupabaseFetch from "./useSupabaseFetch";

import { useProduct } from "../context/ProductCardContext";
import { useAuth } from "../context/AuthContex";
const ProdGrid = ({ tableName }) => {
  const { user } = useAuth();

  const products = useSupabaseFetch(tableName);

  return (
    <div className="grid grid-cols-2 gap-3 px-3 md:grid-cols-3">
      {products?.map((product) => {
        const newWishlistItem = {
          product_id: product.id,
          product_name: product.product_name,
          product_price: product.product_price,
          imageUrl_1: product.imageUrl_1,
          imageUrl_2: product.imageUrl_2,
          discounts: product.discounts,
          user_id: user?.id,
        };
        const newCartItem = {
          product_id: product.id,
          quantity: 1,
          user_id: user?.id,
          product_name: product.product_name,
          product_price: product.product_price,
        };

        return (
          <ProdCard
            key={product.id}
            product={product}
            newWishlistItem={newWishlistItem}
            newCartItem={newCartItem}
          />
        );
      })}
    </div>
  );
};

export default ProdGrid;
