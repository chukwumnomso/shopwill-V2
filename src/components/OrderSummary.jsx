import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Icon from "./Icon";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const OrderSummary = () => {
  const { shoppingCart, cart, cartTotal } = useCart();
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const url = window.location;

  const localCartTotal = shoppingCart
    .map((T) => {
      return T.quantity * T.product_price;
    })
    .reduce((a, b) => a + b, 0);

  return (
    <>
      {shoppingCart.map((product) => (
        <div
          className="font-[jost] px-4 flex gap-10 relative tracking-widest font-light uppercase text-sm py-4 items-center  "
          key={product.timestamp}
        >
          <div className="relative size-15 rounded-lg shadow-sm shadow-black/20 border-3 border-white ">
            <p className="absolute -top-2  text-[0.8rem] size-6 -right-2 flex justify-center items-center bg-black text-white rounded-md border-3 border-white">
              {product.quantity}
            </p>
            <img src={product.imageUrl_1} alt={product.product_name} />
          </div>
          <div>
            <p className="max-w-60 mb-2">{product.product_name}</p>
            <p className="text-xs">size:{product.size}</p>
          </div>
          <p className="absolute top-4 right-4">
            ₦{(product.product_price * product.quantity).toLocaleString()}
          </p>
        </div>
      ))}

      {cart > 0 && (
        <div>
          <div className="  px-4 pt-4 text-gray-800  bg-whiteshadow-neutral-800 shadow-2xl font-[jost]   py-4">
            <div className="flex justify-between items-center">
              <span className="uppercase text-sm tracking-wider">
                cart total:
              </span>

              <span className="text-sm font-semibold">
                ₦
                {user
                  ? cartTotal?.toLocaleString()
                  : localCartTotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="uppercase text-sm tracking-wider">
                subtotal:
              </span>

              <span className="text-sm font-semibold">
                ₦
                {user
                  ? cartTotal.toLocaleString()
                  : localCartTotal.toLocaleString()}
              </span>
            </div>
            {url.pathname === "/checkoutpage" ? (
              <span className="text-sm tracking-widest capitalize ">
                <p className="font-semibold mt-2">
                  Note: 3 days estimated delivery outside aba.
                </p>
              </span>
            ) : null}
            {url.pathname !== "/checkoutpage" ? (
              <>
                <p className="font-semibold tracking-wider mt-2">
                  Tax included. Shipping calculated at checkout.
                </p>

                <button
                  className="bg-black text-white w-full py-2 uppercase hover:bg-gray-800 hover:scale-101 transition-all duration-300 cursor-pointer mt-4"
                  onClick={() => {
                    navigate("/checkoutpage");
                  }}
                >
                  checkout
                </button>
              </>
            ) : null}
          </div>

          {url.pathname !== "/checkoutpage" ? (
            <div className="bg-white py-5 px-4 uppercase text-sm font-light tracking-widest">
              <p
                className="flex items-center gap-1 mb-4  cursor-pointer"
                onClick={() => {
                  setMessageOpen((prev) => !prev);
                }}
              >
                order note
                {messageOpen ? (
                  <Icon
                    name="minus"
                    className={`size-4 ${messageOpen ? "rotate-180" : "null"} text-black  duration-300 transition-transform`}
                  />
                ) : (
                  <Icon
                    name="add"
                    className={`size-4 ${messageOpen ? "rotate-90" : "null"} text-black  duration-300 transition-transform`}
                  />
                )}
              </p>
              <div
                className={` overflow-hidden ${messageOpen ? "max-h-50" : "max-h-0"} transition-height duration-300`}
              >
                <label htmlFor="message" className="text-xs">
                  add a note to your order🖊
                </label>
                <br />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  cols="50"
                  placeholder="write your comment for seller here"
                  rows="5"
                  name="message"
                  className="w-full border px-4 pt-2 uppercase text-xs mt-1"
                ></textarea>
              </div>
              <Link to="/">
                <p className="flex items-center gap-1 text-xs mt-4">
                  <Icon name="arrowLeft" className="w-8" /> continue shopping
                </p>
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default OrderSummary;
