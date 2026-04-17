import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../components/supabaseClient";
import ViewedProduct from "../components/ViewedProduct";

const ViewProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("products_store")
          .select("*")
          .eq("id", productId)
          .single();

        if (error) throw error; // Better error handling
        if (!data) throw new Error("Product not found");

        setProduct(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) return <div className="p-8">Loading product...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  if (!product) return <div className="p-8">Product not found</div>;

  return (
    <div>
      <ViewedProduct product={product} />
    </div>
  );
};

export default ViewProductPage;
