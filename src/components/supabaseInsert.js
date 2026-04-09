import supabase from "./supabaseClient";

const supabaseInsert = async (tableName, items) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .insert(items)
      .select();

    if (data) {
      return;
    } else {
      console.log(error);
    }
  } catch (err) {
    console.error(err);
  }
};

export default supabaseInsert;
