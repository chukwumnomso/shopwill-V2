import React, { useEffect, useState } from "react";
import useSupabaseFetch from "./supabaseFetch";
import Button from "./Button";
import Icon from "./Icon";
import supabaseInsert from "./supabaseInsert";
import supabaseDelete from "./supabaseDelete";
import { getCurrentUser } from "../supabaseAuth/supabaseAuth";

const ProductCard = ({ tableName }) => {
  // PRODUCT CARD LOGICS
  const [images, setImages] = useState([]);
  const [prodCardHover, setProdCardHover] = useState(null);
  const [user, setUser] = useState(null);
  const [whishlist, setWishlist] = useState(() => {
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
    const verify = async () => {
      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData);
        console.log(userData);
      }
    };
    verify();
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(whishlist));
  }, [whishlist]);

  const ToggleLike = (
    cardid,
    product_name,
    product_price,
    imageUrl_1,
    imageUrl_2,
    discounts,
  ) => {
    if (user?.role === "authenticated") {
      console.log("amen");
      setWishlist((prev) => {
        const newLiked = { ...prev };
        if (newLiked[cardid]) {
          delete newLiked[cardid];
        } else {
          newLiked[cardid] = true;
        }
        return newLiked;
      });
      if (!whishlist[cardid]) {
        supabaseInsert(
          cardid,
          product_name,
          product_price,
          imageUrl_1,
          imageUrl_2,
          discounts,
        );
      } else {
        supabaseDelete(cardid);
      }
    } else {
      alert("you have to login first");
    }
  };

  useSupabaseFetch(tableName, "*", setImages);

  const handleCardHover = (id) => {
    setProdCardHover(id);
  };
  const handleCardLeave = () => setProdCardHover(null);

  // END OF PRODUCT CARD LOGICS

  return (
    // FULL PRODUCT CARD
    <div className=" grid grid-cols-2 gap-3  px-3 pt-8 md:grid-cols-3 relative">
      {images.map((card) => (
        <div
          key={card.id}
          className="flex flex-col h-65  mb-8 overflow-hidden cursor-pointer sm:h-90 md:h-75 lg:h-100 "
          onMouseEnter={() => handleCardHover(card.id)}
          onMouseLeave={handleCardLeave}
          onTouchStart={() => handleCardHover(card.id)}
          // onTouchEnd={handleCardLeave}
        >
          {/* PRODUCT CARD IMAGES */}
          <div className="w-full h-[80%] bg-gray-200 relative overflow-hidden object-cover object-center flex items-center justify-center ">
            <img
              src={card.imageUrl_1}
              alt={card.publicUrl}
              className="absolute top-0 left-0 transition-opacity duration-500 cursor-pointer h-full w-full"
              style={{ opacity: prodCardHover === card.id ? 0 : 1 }}
            />
            <img
              src={card.imageUrl_2}
              alt={card.publicUrl}
              className="h-full w-full"
            />

            {/* PRODUCT CARD BUTTONS */}
            <div className="grid grid-cols-2 gap-2 px-1 mt-1 absolute bottom-1 right-1 transition-transform duration-500">
              <Button
                className="text-black size-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-115 transition-transform duration-500 bg-white"
                style={{
                  transform:
                    prodCardHover === card.id ? "" : "translateY(50px)",
                }}
                onClick={() => {
                  ToggleLike(
                    card.id,
                    card.product_name,
                    card.product_price,
                    card.imageUrl_1,
                    card.imageUrl_2,
                    card.discounts,
                  );
                }}
              >
                <Icon
                  name="fav"
                  className="size-5"
                  fill={whishlist[card.id] ? "#B0E0E6" : "white"}
                />
              </Button>
              <Button
                className="bg-black text-white size-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-115 transition-transform duration-500"
                style={{
                  transform:
                    prodCardHover === card.id ? "" : "translateY(1000px)",
                }}
              >
                <Icon name="cart" className="size-5" />
              </Button>
            </div>

            {/* END OF PRODUCT CARD BUTTONS */}
          </div>
          {/* END OF PRODUCT CARD IMAGES */}
          {/* PRODUCT CARD DISCRIPTIONS */}
          <div className=" h-[20%] font-[jost] text-[0.8rem] mt-1 px-1 uppercase">
            <h2 className="hover:text-gray-700 transition-colors duration-300">
              {card.product_name}
            </h2>
            <p>₦{card.product_price}</p>
            <p className="text-gray-500 line-through">
              {card.discounts
                ? `${card.discounts}% OFF ${(
                    (card.discounts / 100) * card.product_price +
                    card.product_price
                  ).toLocaleString()}`
                : null}
            </p>
          </div>
          {/* END OF PRODUCT CARD DESCRIPTIONS */}
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
