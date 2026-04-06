import React, { useEffect } from "react";
import supabase from "./supabaseClient";

const SupabaseInsert = () => {
  useEffect(() => {
    const insert = async function () {
try{
    const {data,error} = await supabase.from("productsV2").
}

    };
  });
};

export default supabaseInsert;
