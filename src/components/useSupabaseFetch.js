import { useEffect, useState } from "react";
import supabase from "./supabaseClient";

const useSupabaseFetch = (tableName) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async function () {
      try {
        const { data } = await supabase.from(tableName).select("*");

        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [tableName]);
  return products;
};

export default useSupabaseFetch;
