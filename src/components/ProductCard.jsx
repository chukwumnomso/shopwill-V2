import React, { useState } from "react";
import supabase from "./supabaseClient";
import useSupabase from "./supabaseHook";
import Button from "./Button";
import Icon from "./Icon";

export default function ProductCard() {
  return <ProductImages />;
}

const ProductImages = () => {
  const [front, setFront] = useState([]);
  const [prodCardHover, setProdCardHover] = useState(null);
  const [likedCards, setLikedCards] = useState({}); // ✅ stores like status per card

  useSupabase("productsV2", "*", setFront);

  const handleCardHover = (id) => {
    setProdCardHover(id);
  };
  const handleCardLeave = () => setProdCardHover(null);

  const toggleLike = (cardId) => {
    setLikedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId], // flip only this card's like status
    }));
  };

  return (
    <div className=" grid grid-cols-2 gap-3  px-3 pt-8">
      {front.map((card) => (
        <div
          key={card.id}
          className="flex flex-col h-75  mb-8 overflow-hidden cursor-pointer"
          onMouseEnter={() => handleCardHover(card.id)}
          onMouseLeave={handleCardLeave}
          onTouchStart={() => handleCardHover(card.id)}
          // onTouchEnd={handleCardLeave}
        >
          <div className="w-full h-[80%] bg-gray-200 relative overflow-hidden object-cover object-center flex items-center justify-center">
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
                onClick={() => toggleLike(card.id)}
              >
                <Icon
                  name="fav"
                  className="size-5"
                  fill={likedCards[card.id] ? "teal" : "white"}
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
          <div className=" h-[20%] font-[jost] text-[0.8rem] mt-3 px-1 uppercase ">
            <h2 className="hover:text-gray-700 transition-colors duration-300">
              {card.product_name}
            </h2>
            <p className="mt-1">₦{card.product_price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
