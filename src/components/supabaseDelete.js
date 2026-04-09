import supabase from "./supabaseClient";

import React from "react";

const supabaseDelete = async (tableName, product_id) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .eq("product_id", product_id);
    if (error) {
      console.error(error);
    }
  } catch (err) {
    console.error(err);
  }
};

export default supabaseDelete;
