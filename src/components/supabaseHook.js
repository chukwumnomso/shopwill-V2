import { useEffect } from "react";
import supabase from "./supabaseClient";

const UseSupabase = (table, row, setter) => {
  useEffect(() => {
    const fetchData = async function () {
      try {
        const { data } = await supabase.from(table).select(row);
        console.log(data);
        setter(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [table, row, setter]);
};

export default UseSupabase;
