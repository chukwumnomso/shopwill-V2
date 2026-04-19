import { useContext, createContext, useState, useEffect } from "react";

import supabase from "../components/supabaseClient";
import { useAuth } from "./AuthContext";
import Loading from "../components/SmallLoadingSpinner";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [wishLists, setWishLists] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        if (!user) {
          const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
          setCart(localCart);
        } else {
          const { data, error } = await supabase
            .from("cart_items")
            .select("*")
            .eq("user_id", user.id);
          if (!error) {
            setCart(data);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [user, cart]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("wishlist")
          .select("*")
          .eq("user_id", user.id);
        if (!error) {
          setWishLists(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [user.id, wishLists]);

  return (
    <CartContext.Provider value={{ cart, setCart, wishLists }}>
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
