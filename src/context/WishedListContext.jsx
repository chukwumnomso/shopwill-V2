import { createContext, useContext, useEffect, useState } from "react";
import supabaseInsert from "../components/supabaseInsert";
import supabaseDelete from "../components/supabaseDelete";
import useWishlist from "../Hooks/wishListHook";
import { useAuth } from "./AuthContex";
import { usePopUp } from "./PopUpContext";

const wishListContext = createContext();

const WishListProvider = ({ children }) => {
  const { user } = useAuth();
  const { setPopUp, setNotUser } = usePopUp(false);

  const { wishList, setWishList } = useWishlist({});

  useEffect(() => {
    setWishList(JSON.parse(localStorage.getItem("wishlist") || {}));
  }, [setWishList]);
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

        if (wishList[product_id]) {
          supabaseDelete("wishlist", product_id);
        } else {
          supabaseInsert("wishlist", items);
        }
      } else if (!user) {
        setPopUp(true);
        setNotUser(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setPopUp(false);
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
