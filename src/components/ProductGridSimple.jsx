import { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import ProdCard from "./ProductCard";
import { useAuth } from "../context/AuthContext";
import Loading from "./SmallLoadingSpinner";
import FullPageSpinner from "./FullPageSpinner";

const ProdGridSimple = ({ tableName, limit = 12, gender }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from(tableName)
        .select("*")
        .eq("gender", gender)
        .limit(limit)
        .order("created_at", { ascending: false });

      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [tableName, limit, gender]);

  if (loading) {
    return <Loading />;
  }

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

export default ProdGridSimple;
