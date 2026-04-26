import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import supabase from "./supabaseClient";
import { useAuth } from "../context/AuthContext";
import Loading from "./SmallLoadingSpinner";
import Icon from "./Icon";
import { useCart } from "../context/CartContext";
import { useWishList } from "../context/WishedListContext";
import { usePopUp } from "../context/PopUpContext";

const WishListPage = () => {
  const { products, setProducts, isLoading, setIsLoading } = useWishList();
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        if (user) {
          const { data, error } = await supabase
            .from("wishlist")
            .select("*")
            .eq("user_id", user.id);

          if (!error) {
            setProducts(data);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [setIsLoading, setProducts, user]);

  if (products?.length < 1)
    return (
      <div className="font-[jost] uppercase tracking-widest flex flex-col items-center justify-center text-gray-500 h-30 text-sm">
        <p> No product in your wish list 😑</p>
        <button
          className="bg-black text-white font-[jost] tracking-widest p-3 mt-4 w-70  uppercase cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => {
            navigate(`/`);
          }}
        >
          continue shopping
        </button>
      </div>
    );

  return (
    <>
      <div className="flex justify-between tracking-widest uppercase font-semibold bg-black text-white px-4 py-4">
        <p className=" w-25">image</p>
        <p className=" w-25">product name</p>
        <p className="w-25">stock</p>
        <p className=" w-25">unit price</p>
        <p className=" w-25">action</p>
      </div>

      <div>
        {products?.map((product) => (
          <WishListComponent
            key={product.id}
            product={product}
            user={user}
            isLoading={isLoading}
          />
        ))}
      </div>
    </>
  );
};

export default WishListPage;

const WishListComponent = ({ product, user, isLoading }) => {
  const { setPopUpMessage, setPopUpVisible } = usePopUp();
  const { AddToCart } = useCart();
  const navigate = useNavigate();
  const { RemoveWishList } = useWishList();

  const newCartItem = {
    product_id: product?.product_id,
    quantity: 1,
    user_id: user?.id,
    product_name: product?.product_name,
    product_price: product?.product_price,
    imageUrl_1: product?.imageUrl_1,
    size: "s",
    timestamp: product.timestamp,
  };

  return (
    <div className="flex  py-4 justify-between font-[jost] tracking-widest text-gray-700  border-t border-gray-300">
      <div
        className=" w-25 cursor-pointer"
        onClick={() => {
          navigate(`/product/${product.product_id} `);
        }}
      >
        <img
          src={product?.imageUrl_1}
          alt={product?.name}
          className="size-25"
        />
      </div>
      <p
        className="capitalize w-25 hover:underline hover:text-black cursor-pointer ml-4"
        onClick={() => {
          navigate(`/product/${product.product_id}`);
        }}
      >
        {product.product_name}
      </p>
      <p className=" w-25 ">{product.stock}</p>
      <p className=" w-25">₦{product.product_price.toLocaleString()}</p>
      <div className=" w-25">
        <button
          className="cursor-pointer"
          onClick={() => {
            AddToCart(newCartItem);
            RemoveWishList(product.product_id);
            setPopUpMessage("addedToCart");
            setPopUpVisible(true);
            setTimeout(() => {
              setPopUpVisible(false);
            }, 3000);
          }}
        >
          <Icon
            name="cart"
            className="size-6 bg-black text-white rounded-full mr-2"
          />
        </button>
        {isLoading ? (
          <Loading size="sm" />
        ) : (
          <button
            onClick={() => {
              RemoveWishList(product.product_id);
              setPopUpMessage("removedFromWishlist");
              setPopUpVisible(true);
              setTimeout(() => {
                setPopUpVisible(false);
              }, 3000);
            }}
            disabled={isLoading}
            className="cursor-pointer"
          >
            <Icon
              name="cancel"
              className="size-6 bg-red-600 text-white rounded-full"
            />
          </button>
        )}
      </div>
    </div>
  );
};
