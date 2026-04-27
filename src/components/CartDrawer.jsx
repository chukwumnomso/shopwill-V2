import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import CartComponent from "./CartComponent";
import { useAuth } from "../context/AuthContext";
import Icon from "./Icon";
import { useModal } from "../context/ModalContext";
import Loading from "./SmallLoadingSpinner";

const CartDrawer = () => {
  const {
    shoppingCart,
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    cartTotal,
    isLoading,
  } = useCart();
  const { user } = useAuth();
  const { setModalOpen } = useModal();
  const navigate = useNavigate();

  const localCartTotal = shoppingCart
    .map((T) => {
      return T.quantity * T.product_price;
    })
    .reduce((a, b) => a + b, 0);

  const tax = shoppingCart
    .map((T) => {
      return T.quantity * 100;
    })
    .reduce((a, b) => a + b, 0);

  return (
    <div
      className={`bg-white h-full w-[90%] fixed z-50 right-0 top-0  shadow-neutral-800 shadow-2xl ${cartDrawerOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 `}
    >
      <div className="overflow-y-auto h-[70%]">
        <p className="border-b border-gray-300  h-15 uppercase font-[jost] flex items-center justify-between tracking-widest px-4">
          shopping cart
          <button
            className="size-8 bg-black rounded-full flex items-center justify-center hover:rotate-90 hover:bg-gray-600 hover:scale-120 transition-all duration-300 cursor-pointer"
            onClick={() => {
              setModalOpen(false);
              setCartDrawerOpen(false);
            }}
          >
            <Icon name="cancel" className="text-white size-6 " />
          </button>
        </p>
        {cart > 0 && (
          <div className="flex justify-between px-4 font- [jost] uppercase mt-6 text-xs tracking-widest text-gray-500">
            <p>
              ({cart}) product<span className="text-xs">(s)</span>
            </p>
            total
          </div>
        )}
        <div>
          {shoppingCart.map((product) => (
            <CartComponent
              key={product.timestamp}
              product={product}
              setCartDrawerOpen={setCartDrawerOpen}
              setModalOpen={setModalOpen}
            />
          ))}
        </div>
        {cart < 1 && (
          <div className=" h-50 pt-15 flex flex-col  font-[jost] uppercase text-sm tracking-widest justify-center items-center gap-2 ">
            <p className="text-gray-500">your shopping cart is empty 😐 </p>

            <button
              className="bg-black text-white h-10 w-[70%] text-sm uppercase hover:scale-103 cursor-pointer transition-transform duration-300"
              onClick={() => {
                setModalOpen(false);
                setCartDrawerOpen(false);
              }}
            >
              <Link to="/"> countinue shopping</Link>
            </button>
          </div>
        )}
      </div>

      {cart > 0 && (
        <div className="fixed bottom-0  w-full px-8 pt-4 text-gray-800 h-50 bg-white shadow-neutral-800 shadow-2xl font-[jost]">
          <div className="flex justify-between items-center">
            <span className="uppercase text-sm tracking-wider">
              cart total:
            </span>

            {isLoading ? (
              <Loading size="sm" color="gray" style="solid" />
            ) : (
              <span className="text-sm">
                ₦
                {user
                  ? cartTotal?.toLocaleString()
                  : localCartTotal.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="uppercase text-sm tracking-wider">subtotal:</span>
            {isLoading ? (
              <Loading size="sm" color="gray" style="solid" />
            ) : (
              <span className="text-sm">
                ₦
                {user
                  ? (cartTotal + tax).toLocaleString()
                  : (localCartTotal + tax).toLocaleString()}
              </span>
            )}
          </div>
          <p className="font-semibold tracking-wider">
            Tax included. Shipping calculated at checkout.
          </p>
          <div className="flex gap-4 mt-4">
            <button
              className="bg-black text-white w-[50%] py-2 uppercase hover:bg-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer "
              onClick={() => {
                navigate("/checkoutpage");
                setCartDrawerOpen(false);
                setModalOpen(false);
              }}
            >
              checkout
            </button>

            <button
              className="bg-white text-black w-[50%] py-2 uppercase border-black border   hover:scale-105 transition-transform duration-300 cursor-pointer "
              onClick={() => {
                navigate("/cartpage");
                setCartDrawerOpen(false);
                setModalOpen(false);
              }}
            >
              view cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
