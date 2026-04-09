import { useEffect } from "react";
import supabase from "./supabaseClient";

const UseSupabaseFetch = (table, row, setter) => {
  useEffect(() => {
    const fetchData = async function () {
      try {
        const { data } = await supabase.from(table).select(row);
        setter(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [table, row, setter]);
};

export default UseSupabaseFetch;
