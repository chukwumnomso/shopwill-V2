import supabase from "./supabaseClient";

async function addToCart(newItem) {
  try {
    const { product_id, quantity, user_id, product_name, product_price } =
      newItem;

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("You must be logged in");
    }

    // Check if item already in cart
    const { data: existingItem, error: fetchError } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("user_id", user.id)
      .eq("product_id", product_id)
      .maybeSingle();

    if (existingItem) {
      // Update quantity if already exists
      const { error: updateError } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + quantity })
        .eq("id", existingItem.id);

      if (updateError) throw updateError;
      return { message: "Cart updated" };
    } else {
      // Insert new item
      const { error: insertError } = await supabase
        .from("cart_items")
        .insert(newItem);

      if (insertError) throw insertError;
      return { message: "Item added to cart" };
    }
  } catch (err) {
    console.error(err);
  }
}

export { addToCart };
