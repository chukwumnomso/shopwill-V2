import { useState } from "react";

import Loading from "./SmallLoadingSpinner";
import Icon from "./Icon";

// import { useCart } from "../context/CartContext";

function ViewedProduct({
  product,
  imageStyle,
  littleImg,
  prodNameStyle,
  prodPriceStyle,
  discountsStyle,
  littleImgPos,
  btnStyle,
}) {
  const [index, setIndex] = useState(0);
  const images = [product?.imageUrl_1, product?.imageUrl_2];

  if (!product) {
    return <Loading />;
  }

  return (
    <div className=" font-[jost]  pt-15  ">
      <div className={`flex items-center mb-2  relative ${imageStyle}`}>
        <button
          onClick={() => {
            setIndex((index - 1 + images.length) % images.length);
            console.log(index);
          }}
          className={`${btnStyle} px-1 py-1 rounded-full left-0 absolute cursor-pointer `}
        >
          <Icon name="arrowLeft" />
        </button>

        <div className="w-full h-full overflow-hidden  ">
          <img
            src={images[index]}
            className="w-full h-full object-cover "
            alt={product.product_name}
          />
        </div>

        <button
          onClick={() => setIndex((index + 1) % images.length)}
          className={`${btnStyle} px-1  py-1 rounded-full absolute right-0 cursor-pointer`}
        >
          <Icon name="arrowRight" />
        </button>
      </div>

      <div className={`flex items-center gap-4 my-4 ${littleImgPos}`}>
        <div
          className={`${littleImg}  ${index === 0 ? "border-2 border-amber-500" : "border"} cursor-pointer`}
          onClick={() => {
            setIndex(0);
          }}
        >
          <img src={product?.imageUrl_1} alt="" />
        </div>
        <div
          className={`${littleImg}   ${index === 1 ? "border-2 border-amber-500" : "border"} cursor-pointer`}
          onClick={() => setIndex(1)}
        >
          <img src={product?.imageUrl_2} alt="" />
        </div>
      </div>

      <h3 className={`font-normal uppercase ${prodNameStyle} tracking-widest`}>
        {product?.product_name}
      </h3>
      <p className={`text-amber-600 ${prodPriceStyle}`}>
        ₦{product.product_price?.toLocaleString()}
      </p>
      <p className={`line-through text-gray-500 ${discountsStyle}`}>
        {product.discounts
          ? `${product?.discounts}% OFF ${(
              (product?.discounts / 100) * product?.product_price +
              product?.product_price
            ).toLocaleString()}`
          : null}
      </p>
    </div>
  );
}

export default ViewedProduct;
