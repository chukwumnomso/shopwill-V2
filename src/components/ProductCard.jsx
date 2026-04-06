import React, { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import useSupabaseFetch from "./supabaseFetch";
import Button from "./Button";
import Icon from "./Icon";

export default function ProductCard() {
  return <ProductImages />;
}

const ProductImages = () => {
  const [images, setImages] = useState([]);
  const [prodCardHover, setProdCardHover] = useState(null);
  const [likedCards, setLikedCards] = useState(() => {
    try {
      const saved = localStorage.getItem("favourites");

      if (saved && saved !== "undefined") {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse favorites", e);
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(likedCards));
  }, [likedCards]);

  const toggleLike = (cardid) => {
    setLikedCards((prev) => {
      const newLiked = { ...prev };
      if (newLiked[cardid]) {
        delete newLiked[cardid];
      } else {
        newLiked[cardid] = true;
        console.log("added");
      }
      return newLiked;
    });
  };

  useSupabaseFetch("product", "*", setImages);

  const handleCardHover = (id) => {
    setProdCardHover(id);
  };
  const handleCardLeave = () => setProdCardHover(null);

  return (
    <div className=" grid grid-cols-2 gap-3  px-3 pt-8 md:grid-cols-3">
      {images.map((card) => (
        <div
          key={card.id}
          className="flex flex-col h-65  mb-8 overflow-hidden cursor-pointer sm:h-90 md:h-75 lg:h-100 "
          onMouseEnter={() => handleCardHover(card.id)}
          onMouseLeave={handleCardLeave}
          onTouchStart={() => handleCardHover(card.id)}
          // onTouchEnd={handleCardLeave}
        >
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
            <div className="grid grid-cols-2 gap-2 px-1 mt-1 absolute bottom-1 right-1 transition-transform duration-500">
              <Button
                className="text-black size-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-115 transition-transform duration-500 bg-white"
                style={{
                  transform:
                    prodCardHover === card.id ? "" : "translateY(50px)",
                }}
                onClick={() => {
                  toggleLike(card.id);
                }}
              >
                <Icon
                  name="fav"
                  className="size-5"
                  fill={likedCards[card.id] ? "#B0E0E6" : "white"}
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
          </div>
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
        </div>
      ))}
    </div>
  );
};
