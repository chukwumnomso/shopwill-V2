import React from "react";

import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import CartComponent from "../components/CartComponent";

import Icon from "../components/Icon";
import { useModal } from "../context/ModalContext";
import Loading from "../components/SmallLoadingSpinner";
import OrderSummary from "../components/OrderSummary";

const CartPage = () => {
  const { shoppingCart } = useCart();
  return (
    <div className="md:flex justify-between  items-start  gap-4 md:gap-8 md:mt-8">
      <div className="md:w-[50%] ">
        <p className="text-center text-sm uppercase tracking-widest py-4">
          cart items
        </p>
        <div>
          {shoppingCart.map((product) => (
            <CartComponent key={product.timestamp} product={product} />
          ))}
        </div>
      </div>

      <div className="bg-gray-200 md:w-[50%]  sticky top-5">
        <p className="uppercase py-4 text-center tracking-widest text-sm">
          order summary
        </p>
        <OrderSummary />
      </div>
    </div>
  );
};

export default CartPage;
