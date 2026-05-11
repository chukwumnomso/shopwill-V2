import { useState } from "react";

import OrderSummary from "../components/OrderSummary";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Icon from "../components/Icon";
import ContactForm from "../components/ContactForm";

const CheckOutPage = () => {
  const [orderOpen, setOrderOpen] = useState(false);
  const { shoppingCart, cartTotal } = useCart();
  const { user } = useAuth();

  const localCartTotal = shoppingCart
    .map((T) => {
      return T.quantity * T.product_price;
    })
    .reduce((a, b) => a + b, 0);

  return (
    <div
      className={`grid-cols-2 gap-4 ${shoppingCart.length < 1 || cartTotal === 0 ? "md:block" : "md:grid"}`}
    >
      <>
        <div
          className={`flex justify-between items-center px-4 tracking-widest uppercase text-xs h-15 border border-gray-500 bg-gray-200  md:hidden ${shoppingCart.length < 1 || cartTotal === 0 ? "hidden" : "block"}`}
        >
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => {
              setOrderOpen((prev) => !prev);
            }}
          >
            order summary
            <Icon
              name={`${orderOpen ? "arrowUp" : "arrowDown"}`}
              className="size-4"
            />
          </div>
          <span className="text-sm">
            ₦
            {user
              ? cartTotal?.toLocaleString()
              : localCartTotal?.toLocaleString()}
          </span>
        </div>
        <div
          className={`${orderOpen ? "max-h-500" : "max-h-0"} ${orderOpen ? "py-6" : "py-0"} overflow-hidden transition-height duration-300 bg-gray-200  md:max-h-none md:py-6  ${shoppingCart.length < 1 || cartTotal === 0 ? "hidden" : "block"}`}
        >
          <OrderSummary />
        </div>
      </>
      <ContactForm />
    </div>
  );
};

export default CheckOutPage;
