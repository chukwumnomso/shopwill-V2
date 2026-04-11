import { useState, useEffect } from "react";

const useWishlist = () => {
  const [wishList, setWishList] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");

      if (saved && saved !== "undefined") {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse wishlist", e);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  return { wishList, setWishList };
};

export default useWishlist;
