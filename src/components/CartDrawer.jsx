import { useCart } from "../context/CartContext";
import CartComponent from "./CartComponent";
import { useAuth } from "../context/AuthContext";
import Icon from "./Icon";
import { useModal } from "../context/ModalContext";

const CartDrawer = () => {
  const {
    shoppingCart,
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    cartTotal,
    setCartTotal,
  } = useCart();
  const { user } = useAuth();
  const { setModalOpen } = useModal();

  const CartTotal = shoppingCart
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
      className={`bg-white h-full w-[90%] fixed z-50 right-0 top-0  shadow-neutral-800 shadow-2xl ${cartDrawerOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}
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
        <div className="flex justify-between px-4 font- [jost] uppercase mt-6">
          <p>
            ({cart}) product<span className="text-xs">(s)</span>
          </p>
          total
        </div>
        <div>
          {shoppingCart.map((product) => (
            <CartComponent key={product.timestamp} product={product} />
          ))}
        </div>
      </div>
      <div className="fixed bottom-0  w-full px-8 pt-4 text-gray-800 h-50 bg-white shadow-neutral-800 shadow-2xl font-[jost]">
        <div className="flex justify-between items-center">
          <span className="uppercase text-sm tracking-wider">cart total:</span>
          <span className="text-sm">
            ₦{user ? cartTotal?.toLocaleString() : CartTotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="uppercase text-sm tracking-wider">subtotal:</span>
          <span className="text-sm">
            ₦
            {user
              ? (cartTotal + tax).toLocaleString()
              : (CartTotal + tax).toLocaleString()}
          </span>
        </div>
        <p className="font-semibold tracking-wider">
          Tax included. Shipping calculated at checkout.
        </p>
        <div className="flex gap-4 mt-4">
          <button className="bg-black text-white w-[50%] py-2 uppercase hover:bg-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer ">
            checkout
          </button>
          <button className="bg-white text-black w-[50%] py-2 uppercase border-black border   hover:scale-105 transition-transform duration-300 cursor-pointer ">
            view cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
