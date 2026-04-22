import { useEffect, useState } from "react";
import supabase from "./supabaseClient";

import Icon from "./Icon";
import ViewedProduct from "./ViewedProduct";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";
import { usePopUp } from "../context/PopUpContext";
import { useCart } from "../context/CartContext";
import Loading from "./SmallLoadingSpinner";

const BottomSlideView = ({ setModalOpen }) => {
  const [product, setProduct] = useState(null);
  const [prodSize, setProdSize] = useState(null);
  const [inputValue, setInputValue] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { setPopUpMessage, setPopUpVisible } = usePopUp();
  const { AddToCart, productID, bottomCartOpen, setBottomCartOpen } = useCart();
  const { user } = useAuth();

  const newCartItem = {
    product_id: product?.id,
    quantity: inputValue,
    user_id: user?.id,
    product_name: product?.product_name,
    product_price: product?.product_price,
    imageUrl_1: product?.imageUrl_1,
    size: prodSize,
    timestamp: Date.now(),
  };

  const handleSize = (size) => {
    setProdSize(size);
  };

  const handleAddToCart = () => {
    AddToCart(newCartItem);
    setPopUpMessage("addedToCart");
    setPopUpVisible(true);
    setBottomCartOpen(false);
    setModalOpen(false);
    setTimeout(() => {
      setPopUpVisible(false);
    }, 3000);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);

        let query = supabase.from("products_store").select("*");
        if (productID) {
          query = query.eq("id", productID);
        } else {
          return;
        }
        query = query.single();
        const { data, error } = await query;

        if (!error) setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [productID]);

  return (
    <div
      className={`fixed z-50 h-[80%] bg-gray-900 bottom-0 w-full overflow-y-auto ${bottomCartOpen ? "translate-y-0" : "translate-y-full"} transition-transform duration-500`}
    >
      <div className="h-15  flex text-center items-center px-4 border-b border-white">
        <p className="font-[jost] m-auto  uppercase text-white">
          choose options
        </p>
        <Icon
          name="cancel"
          className="size-6 absolute right-5 text-white"
          onClick={() => {
            setBottomCartOpen(false);
            setModalOpen(false);
          }}
        />
      </div>
      <div className="px-4 pb-10">
        <div>
          <ViewedProduct
            product={product}
            imageStyle={`size-70 m-auto`}
            littleImg={`size-15`}
            littleImgPos={`justify-center`}
            discountsStyle={`text-sm text-red-500`}
            prodPriceStyle={`text-sm`}
            prodNameStyle={`text-sm text-white`}
            btnStyle={`bg-white/50`}
          />
        </div>
        <p className="mt-4 text-white">sizes:</p>
        <div className="flex gap-4 text-white ">
          {product?.sizes.map((size) => (
            <button
              className={`px-4 ${prodSize === size ? "border-2 border-amber-500" : "border"} size-6 text-sm uppercase flex justify-center items-center cursor-pointer `}
              key={size}
              onClick={() => handleSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        {prodSize === null && (
          <p className="text-xs text-red-500 italic mt-2">*choose size*</p>
        )}
        <div className="border flex items-center w-30 h-10 justify-between mt-4 bg-white ">
          <button
            className="bg-white text-4xl size-8 flex items-center justify-center cursor-pointer "
            onClick={() => {
              setInputValue((prev) => prev - 1);
            }}
            disabled={inputValue <= 1 ? true : false}
          >
            -
          </button>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="number"
            className="no-spin focus:outline-none focus:ring-none w-8 text-center "
          />
          <button
            className="bg-white text-xl size-8  flex items-center justify-center cursor-pointer"
            onClick={() => {
              setInputValue((prev) => Number(prev) + 1);
            }}
          >
            +
          </button>
        </div>
        <Button
          className=" bg-white text-black uppercase hover:text-blue-300 w-full p-3 border my-4 cursor-pointer"
          onClick={() => {
            handleAddToCart();
          }}
          disabled={prodSize === null ? true : false}
        >
          add to cart
        </Button>
        <Button className=" bg-black text-white uppercase hover:text-blue-300 w-full p-3 cursor-pointer">
          buy now
        </Button>
      </div>
    </div>
  );
};

export default BottomSlideView;
