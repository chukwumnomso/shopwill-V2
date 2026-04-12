import supabase from "./supabaseClient";

async function AddToCart(newItem) {
  try {
    const { product_id, quantity } = newItem;

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      const rawCart = JSON.parse(localStorage.getItem("cart"));
      let cart = Array.isArray(rawCart) ? rawCart : rawCart ? [rawCart] : [];

      const existingItemIndex = cart.findIndex(
        (item) => item.product_id === newItem.product_id,
      );

      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += newItem.quantity || 1;
      } else {
        cart.push(newItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      return;
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

export { AddToCart };
