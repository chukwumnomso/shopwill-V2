import { createContext, useContext, useEffect, useState } from "react";
import supabaseInsert from "../components/supabaseInsert";
import supabaseDelete from "../components/supabaseDelete";
import useWishlist from "../Hooks/wishListHook";
import { useAuth } from "./AuthContex";
import { useModal } from "./ModalContext";

const wishListContext = createContext();

const WishListProvider = ({ children }) => {
  const { user } = useAuth();
  const { setModal, setNotUser } = useModal(false);

  const { wishList, setWishList } = useWishlist(() => {
    try {
      const saved = localStorage.getItem("wishlist");

      if (saved && saved !== "undefined") {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse wishlist", e);
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const ToggleLike = (product_id, items) => {
    try {
      if (user) {
        setWishList((prev) => {
          const newLiked = { ...prev };
          if (newLiked[product_id]) {
            delete newLiked[product_id];
          } else {
            newLiked[product_id] = true;
          }
          return newLiked;
        });

        if (!wishList[product_id]) {
          supabaseInsert("wishlist", items);
        } else {
          supabaseDelete("wishlist", product_id);
        }
      } else if (!user) {
        setModal(true);
        setNotUser(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setModal(false);
        setNotUser(false);
      }, 3000);
    }
  };

  return (
    <wishListContext.Provider value={{ wishList, ToggleLike }}>
      {children}
    </wishListContext.Provider>
  );
};
const useWishList = () => {
  const context = useContext(wishListContext);
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useWishList, WishListProvider };
