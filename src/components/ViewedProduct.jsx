import { useEffect, useState } from "react";

import Loading from "./SmallLoadingSpinner";
import Icon from "./Icon";
import Button from "./Button";
import ProdGridSimple from "./ProductGridSimple";
import { AddToCart } from "./supabaseCartActions";
import { useAuth } from "../context/AuthContext";
import { usePopUp } from "../context/PopUpContext";

function ViewedProduct({ product }) {
  const [index, setIndex] = useState(0);
  const images = [product.imageUrl_1, product.imageUrl_2];
  const [prodSize, setProdSize] = useState(null);
  const [inputValue, setInputValue] = useState(1);
  const { setPopUpMessage, setPopUpVisible } = usePopUp();
  const { user } = useAuth();

  const newCartItem = {
    product_id: product.id,
    quantity: inputValue,
    user_id: user?.id,
    product_name: product.product_name,
    product_price: product.product_price,
    size: prodSize,
  };

  if (!product) {
    return <Loading />;
  }

  const handleSize = (size) => {
    setProdSize(size);
  };

  return (
    <div className=" font-[jost] px-4 pt-15">
      <div className="flex items-center mb-2  relative ">
        <button
          onClick={() => {
            setIndex((index - 1 + images.length) % images.length);
            console.log(index);
          }}
          className="bg-black/5  text-white px-1 py-1 rounded-full left-0 absolute cursor-pointer "
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
          className="bg-black/5 text-white px-1  py-1 rounded-full absolute right-0 cursor-pointer"
        >
          <Icon name="arrowRight" />
        </button>
      </div>

      <div className="flex items-center gap-4 my-4">
        <div
          className={`size-15  ${index === 0 ? "border-2 border-amber-500" : "border"} cursor-pointer`}
          onClick={() => {
            setIndex(0);
          }}
        >
          <img src={product.imageUrl_1} alt="" />
        </div>
        <div
          className={`size-15  ${index === 1 ? "border-2 border-amber-500" : "border"} cursor-pointer`}
          onClick={() => setIndex(1)}
        >
          <img src={product.imageUrl_2} alt="" />
        </div>
      </div>

      <h3 className="font-normal uppercase text-lg tracking-widest">
        {product.product_name}
      </h3>
      <p className="text-amber-600">
        ₦{product.product_price.toLocaleString()}
      </p>
      <p className="line-through text-gray-500">
        {product.discounts
          ? `${product.discounts}% OFF ${(
              (product.discounts / 100) * product.product_price +
              product.product_price
            ).toLocaleString()}`
          : null}
      </p>

      <div className=" my-6">
        <p className="text-lg uppercase tracking-wider">description</p>
        <p className="font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe facilis
          rerum soluta, est laborum rem quaerat error. Rem, quia a dicta
          corporis veniam aliquid labore, debitis officiis necessitatibus
          accusamus iusto asperiores assumenda, architecto esse temporibus
          facere! Facere, sequi a iusto asperiores impedit assumenda harum, unde
          veritatis incidunt pariatur consectetur magni.
        </p>
      </div>

      <p className="mt-4">sizes:</p>
      <div className="flex gap-4 ">
        {product.sizes.map((size) => (
          <button
            className={`px-4 ${prodSize === size ? "border-2 border-amber-500" : "border"} size-8 text-lg uppercase flex justify-center items-center cursor-pointer`}
            key={size}
            onClick={() => handleSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      <div className="border flex items-center w-30 h-10 justify-between mt-4">
        <button
          className="bg-white text-4xl size-8 flex items-center justify-center "
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
          className="no-spin focus:outline-none focus:ring-none w-8 text-center  "
        />
        <button
          className="bg-white text-xl size-8  flex items-center justify-center"
          onClick={() => {
            setInputValue((prev) => Number(prev) + 1);
          }}
        >
          +
        </button>
      </div>

      <p className="mt-6 text-amber-700">
        Free delivery applies to Lagos orders of ₦200,000 and above
      </p>

      <Button
        className=" bg-white text-black uppercase hover:text-blue-300 w-full p-3 border my-4 cursor-pointer"
        onClick={() => {
          AddToCart(newCartItem);
          setPopUpMessage("addedToCart");
          setPopUpVisible(true);
          setTimeout(() => {
            setPopUpVisible(false);
          }, 3000);
        }}
        disabled={prodSize === null ? true : false}
      >
        add to cart
      </Button>
      <Button className=" bg-black text-white uppercase hover:text-blue-300 w-full p-3 cursor-pointer">
        buy now
      </Button>
      <p className="text-center mt-10 font-light text-2xl uppercase ">
        you may also like
      </p>
      <ProdGridSimple
        gender="male"
        tableName="products_store"
        limit="4"
        category={product.category}
      />
    </div>
  );
}

export default ViewedProduct;
