import { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import ProdCard from "./ProductCard";
import { useAuth } from "../context/AuthContext";
import Loading from "./SmallLoadingSpinner";
import FullPageSpinner from "./FullPageSpinner";

const ProdGridSimple = ({
  tableName,
  limit = 12,
  gender,
  category,
  notEqual,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let query = supabase.from(tableName).select("*");
        if (gender && gender !== "") {
          query = query.eq("gender", gender);
        }
        if (category && category !== "") {
          query = query.eq("category", category);
        }
        if (notEqual && notEqual !== "") {
          query = query.neq("id", notEqual);
        }
        query = query.limit(limit).order("created_at", { ascending: false });
        const { data } = await query;

        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [tableName, limit, gender, category, notEqual]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div className="text-red-500">Error:{error}</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4  px-3 md:grid-cols-3 lg:grid-cols-4 ">
      {products?.map((product) => {
        const newWishlistItem = {
          product_id: product.id,
          product_name: product.product_name,
          product_price: product.product_price,
          imageUrl_1: product.imageUrl_1,
          imageUrl_2: product.imageUrl_2,
          discounts: product.discounts,
          user_id: user?.id,
          size: "s",
          timestamp: product.created_at,
          stock: product.stock,
        };

        return (
          <ProdCard
            key={product.id}
            product={product}
            newWishlistItem={newWishlistItem}
          />
        );
      })}
    </div>
  );
};

export default ProdGridSimple;
