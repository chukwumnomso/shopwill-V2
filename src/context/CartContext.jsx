import { useContext, createContext, useState, useEffect } from "react";
import supabase from "../components/supabaseClient";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(0);
  const [productID, setProductID] = useState(null);
  const [bottomCartOpen, setBottomCartOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [sizeWarning, setSizeWarning] = useState(false);
  const [shoppingCart, setShoppinCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function DeleteFromCart(timestamp) {
    try {
      setIsLoading(true);
      if (!user) {
        const rawCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const Cart = rawCart.filter((prod) => prod.timestamp !== timestamp);
        localStorage.setItem("cart", JSON.stringify(Cart));
        const newRawCart = JSON.parse(localStorage.getItem("cart") || []);

        const localCartQuantity = newRawCart
          ?.map((q) => {
            return q.quantity;
          })
          .reduce((a, b) => a + b, 0);
        setShoppinCart(newRawCart);
        setCart(localCartQuantity);
        return;
      }
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("timestamp", timestamp);
      if (!error) {
        const { data } = await supabase.from("cart_items").select("*");

        const databaseCartQuantity = data
          .map((q) => {
            return q.quantity;
          })
          .reduce((a, b) => a + b, 0);
        setCart(databaseCartQuantity);
        setShoppinCart(data);

        const CartTotal = data
          .map((T) => {
            return T.quantity * T.product_price;
          })
          .reduce((a, b) => a + b, 0);
        setCartTotal(CartTotal);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function ReduceQuantity(newItem) {
    try {
      setIsLoading(true);
      const { product_id, size } = newItem;

      if (!user) {
        const rawCart = JSON.parse(localStorage.getItem("cart"));
        let localCart = Array.isArray(rawCart)
          ? rawCart
          : rawCart
            ? [rawCart]
            : [];

        const existingItemIndex = localCart.findIndex(
          (item) =>
            item.product_id === newItem.product_id &&
            item.size === newItem.size,
        );

        if (existingItemIndex > -1) {
          localCart[existingItemIndex].quantity -= newItem.quantity || 1;
        }

        localStorage.setItem("cart", JSON.stringify(localCart));
        const newRawCart = JSON.parse(localStorage.getItem("cart") || []);
        const localCartQuantity = newRawCart
          ?.map((q) => {
            return q.quantity;
          })
          .reduce((a, b) => a + b, 0);
        setCart(localCartQuantity);
        setShoppinCart(newRawCart);

        return;
      }

      // Check if item already in cart
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", product_id)
        .eq("size", size)
        .maybeSingle();

      if (existingItem) {
        // Update quantity if already exists
        const { error: updateError } = await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity - 1 })
          .eq("id", existingItem.id);

        if (updateError) throw updateError;
      }
      const { data, error } = await supabase.from("cart_items").select("*");
      if (!error) {
        const databaseCartQuantity = data
          .map((q) => {
            return q.quantity;
          })
          .reduce((a, b) => a + b, 0);
        setCart(databaseCartQuantity);
        setShoppinCart(data);
        const CartTotal = data
          .map((T) => {
            return T.quantity * T.product_price;
          })
          .reduce((a, b) => a + b, 0);
        setCartTotal(CartTotal);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function AddToCart(newItem) {
    try {
      setIsLoading(true);
      const { product_id, size } = newItem;

      if (!user) {
        const rawCart = JSON.parse(localStorage.getItem("cart"));
        let localCart = Array.isArray(rawCart)
          ? rawCart
          : rawCart
            ? [rawCart]
            : [];

        const existingItemIndex = localCart.findIndex(
          (item) =>
            item.product_id === newItem.product_id &&
            item.size === newItem.size,
        );

        if (existingItemIndex > -1) {
          localCart[existingItemIndex].quantity += newItem.quantity || 1;
        } else {
          localCart.push(newItem);
        }

        localStorage.setItem("cart", JSON.stringify(localCart));
        const newRawCart = JSON.parse(localStorage.getItem("cart") || []);
        const localCartQuantity = newRawCart
          ?.map((q) => {
            return q.quantity;
          })
          .reduce((a, b) => a + b, 0);
        setCart(localCartQuantity);
        setShoppinCart(newRawCart);

        return;
      }

      // Check if item already in cart
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", product_id)
        .eq("size", size)
        .maybeSingle();

      if (existingItem) {
        // Update quantity if already exists
        const { error: updateError } = await supabase
          .from("cart_items")
          .update({ quantity: Number(existingItem.quantity) + 1 })
          .eq("id", existingItem.id);

        if (updateError) throw updateError;
      } else {
        // Insert new item
        const { error: insertError } = await supabase
          .from("cart_items")
          .insert(newItem);

        if (insertError) throw insertError;
      }
      const { data, error } = await supabase.from("cart_items").select("*");

      if (!error) {
        const databaseCartQuantity = data
          .map((q) => {
            return q.quantity;
          })
          .reduce((a, b) => a + b, 0);
        setCart(databaseCartQuantity);
        setShoppinCart(data);

        const CartTotal = data
          .map((T) => {
            return T.quantity * T.product_price;
          })
          .reduce((a, b) => a + b, 0);
        setCartTotal(CartTotal);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const newRawCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const localCartQuantity = newRawCart
      ?.map((q) => {
        return q.quantity;
      })
      .reduce((a, b) => a + b, 0);
    setCart(localCartQuantity);
    setShoppinCart(newRawCart);
  }, [user]);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from("cart_items").select("*");
      if (user && !error) {
        const databaseCartQuantity = data
          .map((q) => {
            return q.quantity;
          })
          .reduce((a, b) => a + b, 0);

        setCart(databaseCartQuantity);
        setShoppinCart(data);
        const CartTotal = data
          .map((T) => {
            return T.quantity * T.product_price;
          })
          .reduce((a, b) => a + b, 0);
        setCartTotal(CartTotal);
      }
    };
    fetch();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        AddToCart,
        cart,
        productID,
        setProductID,
        bottomCartOpen,
        setBottomCartOpen,
        shoppingCart,
        ReduceQuantity,
        cartDrawerOpen,
        setCartDrawerOpen,
        sizeWarning,
        setSizeWarning,
        cartTotal,
        setCartTotal,
        DeleteFromCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("must be used within the cart provider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useCart, CartProvider };
