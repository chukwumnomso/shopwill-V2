import Button from "./Button";
import Icon from "./Icon";
import { useProduct } from "../context/ProductCardContext";
import { useWishList } from "../context/WishedListContext";
import { usePopUp } from "../context/PopUpContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useModal } from "../context/ModalContext";

const ProdCard = ({ product, newWishlistItem }) => {
  const { handleCardHover, handleCardLeave, prodCardHover } = useProduct();
  const { wishList, AddWishList } = useWishList();
  const { popUpVisible } = usePopUp();
  const { user } = useAuth();
  const { setProductID, setBottomCartOpen } = useCart();
  const { setModalOpen } = useModal();

  return (
    <div>
      <div
        className="h-50 bg-gray-200 relative overflow-hidden object-cover object-center flex items-center justify-center sm:h-65 md:h-65 lg:h-80 cursor-pointer"
        onMouseEnter={() => handleCardHover(product.id)}
        onMouseLeave={handleCardLeave}
        onTouchStart={() => handleCardHover(product.id)}
      >
        <img
          src={product.imageUrl_1}
          alt=""
          loading="lazy"
          className="absolute top-0 left-0 transition-opacity duration-500 cursor-pointer h-full w-full"
          style={{ opacity: prodCardHover === product.id ? 0 : 1 }}
        />
        <img src={product.imageUrl_2} alt="" className="h-full w-full" />

        <div className="absolute  w-full bottom-1 flex justify-end items-center gap-2 px-4 cursor-pointer">
          <Button
            className="bg-white text-black size-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-115 transition-transform duration-500"
            style={{
              transform: prodCardHover === product.id ? "" : "translateY(50px)",
            }}
            onClick={() => {
              AddWishList(newWishlistItem);
            }}
            disabled={popUpVisible}
          >
            <Icon
              name="fav"
              className="size-5"
              fill={wishList?.[product.id] && user ? "#B0E0E6" : "white"}
            />
          </Button>

          <Button
            className="bg-black text-white size-10 rounded-full flex justify-center items-center cursor-pointer  hover:scale-115 transition-transform duration-500"
            style={{
              transform:
                prodCardHover === product.id ? "" : "translateY(1000px)",
            }}
            onClick={() => {
              setProductID(product.id);
              setModalOpen(true);
              setBottomCartOpen(true);
            }}
            disable={popUpVisible}
          >
            <Icon name="cart" className="size-5" />
          </Button>
        </div>
      </div>
      <div className="h-20 font-[jost] text-[0.8rem]  px-1 uppercase ">
        <Link to={`/product/${product.id}`}>
          <h2 className="hover:text-gray-700 transition-colors duration-300 cursor-pointer tracking-wider ">
            {product.product_name}
          </h2>
        </Link>
        <p className="text-amber-600">
          ₦{product.product_price.toLocaleString()}
        </p>
        <p className="text-gray-500 line-through font-light">
          {product.discounts
            ? `${product.discounts}% OFF ${(
                (product.discounts / 100) * product.product_price +
                product.product_price
              ).toLocaleString()}`
            : null}
        </p>
      </div>
    </div>
  );
};

export default ProdCard;
