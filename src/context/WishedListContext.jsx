import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../components/supabaseClient";

import { useAuth } from "./AuthContext";
import { usePopUp } from "./PopUpContext";

const wishListContext = createContext();

const WishListProvider = ({ children }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const { setPopUpVisible, setPopUpMessage } = usePopUp();
  const [wishList, setWishList] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const AddWishList = async (newItem) => {
    try {
      const { product_id } = newItem;
      if (!user) {
        setPopUpMessage("loginRequired");
        setPopUpVisible(true);
        setTimeout(() => {
          setPopUpVisible(false);
        }, 2000);
        return;
      }
      const { data: existingItem } = await supabase
        .from("wishlist")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", product_id);

      if (existingItem && existingItem.length > 0) {
        setPopUpMessage("wishlistexist");
        setPopUpVisible(true);
        setTimeout(() => {
          setPopUpVisible(false);
        }, 2000);
      } else {
        const { data: inserted } = await supabase
          .from("wishlist")
          .insert(newItem)
          .select("*");

        if (inserted) {
          setPopUpMessage("addedToWishlist");
          setPopUpVisible(true);
          setTimeout(() => {
            setPopUpVisible(false);
          }, 2000);
        }
      }
      const { data, error } = await supabase.from("wishlist").select("*");
      if (!error) {
        setWishList(data.length);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const RemoveWishList = async (productId) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("product_id", productId);
      if (error) {
        throw new Error(error);
      }

      const { data } = await supabase.from("wishlist").select("*");
      if (data) {
        setWishList(data.length);
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from("wishlist").select("*");
      if (!error) {
        setWishList(data.length);
        setProducts(data);
      }
    };
    fetch();
  }, [user]);

  return (
    <wishListContext.Provider
      value={{
        wishList,
        AddWishList,
        isLoading,
        setIsLoading,
        RemoveWishList,
        products,
        setProducts,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
};
const useWishList = () => {
  const context = useContext(wishListContext);
  if (!context) {
    throw new Error("useWishList must be used within a WishListProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useWishList, WishListProvider };
