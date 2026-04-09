import supabase from "./supabaseClient";

const synchronizeCart = async (user_id) => {
  // 1. Parse the local storage string into an array
  const localCart = JSON.parse(localStorage.getItem("cart")) || [];

  // 2. Add the user_id to every item in the array (Essential!)
  const cartWithUser = localCart.map((item) => ({
    ...item,
    user_id: user_id, // Assuming 'user' is your logged-in user object
  }));

  // 3. Sync everything to Supabase in one call
  const { data, error } = await supabase
    .from("cart_items")
    .upsert(cartWithUser, { onConflict: "user_id,product_id" }) // Use your unique constraints
    .select();

  if (error) {
    console.log(error);
  } else {
    localStorage.removeItem("cart");
  }
};
export { synchronizeCart };
