import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Icon from "./Icon";
import { useCart } from "../context/CartContext";
import Loading from "./SmallLoadingSpinner";

const CartComponent = ({ product }) => {
  const [inputValue, setInputValue] = useState(product.quantity);
  const { AddToCart, ReduceQuantity, DeleteFromCart, isLoading } = useCart();
  const { user } = useAuth();

  const newItem = {
    product_id: product.product_id,
    product_name: product.product_name,
    product_price: product.product_price,
    imageUrl_1: product.imageUrl_1,
    imageUrl_2: product.imageUrl_2,
    discounts: product.discounts,
    user_id: user?.id,
    size: product.size,
  };

  return (
    <div className="flex gap-4 font-[jost] border-b border-gray-300 pb-6 mt-10 px-4 items-center relative">
      <Link to={`product/${product.product_id}`}>
        <img
          src={product.imageUrl_1}
          alt={product.product_name}
          className="size-20"
        />
      </Link>
      <div className="flex flex-col gap-1  ">
        <Link to={`product/${product.product_id}`}>
          <p className="tracking-wide text-sm uppercase hover:underline max-w-60">
            {product.product_name}
          </p>
        </Link>
        <p className="uppercase text-xs text-gray-500">size:{product.size}</p>
        <p className="text-black text-sm">
          ₦{product.product_price.toLocaleString()}
        </p>
        <div className="flex items-center gap-4">
          <div className="border flex items-center w-20 h-10 justify-between mt-2 bg-white ">
            <button
              className="bg-white text-4xl size-6 flex items-center justify-center cursor-pointer "
              onClick={() => {
                setInputValue((prev) => prev - 1);
                ReduceQuantity(newItem);
              }}
              disabled={inputValue <= 1 || isLoading ? true : false}
            >
              -
            </button>
            <input
              value={inputValue < 1 ? 1 : inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="number"
              className="no-spin focus:outline-none focus:ring-none w-6 text-center text-sm "
            />
            <button
              className="bg-white text-xl size-6  flex items-center justify-center cursor-pointer"
              onClick={() => {
                setInputValue((prev) => Number(prev) + 1);
                AddToCart(newItem);
              }}
              disabled={isLoading}
            >
              +
            </button>
          </div>
          <button
            className="underline capitalize text-gray-500 hover:text-red-500 cursor-pointer text-sm"
            onClick={() => {
              DeleteFromCart(product.timestamp);
            }}
          >
            remove
          </button>
        </div>
      </div>
      {isLoading ? (
        <Loading size="sm" />
      ) : (
        <p className="absolute right-4 text-gray-800">
          ₦ {(product.product_price * inputValue).toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default CartComponent;
