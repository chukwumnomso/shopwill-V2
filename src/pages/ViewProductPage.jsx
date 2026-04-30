import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../components/supabaseClient";
import ViewedProduct from "../components/ViewedProduct";
import Loading from "../components/SmallLoadingSpinner";
import Button from "../components/Button";
import ProdGridSimple from "../components/ProductGridSimple";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { usePopUp } from "../context/PopUpContext";
import Icon from "../components/Icon";

const ViewProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prodSize, setProdSize] = useState(null);
  const [inputValue, setInputValue] = useState(1);
  const { setPopUpMessage, setPopUpVisible } = usePopUp();
  const { AddToCart } = useCart();
  const { user } = useAuth();

  const handleSize = (size) => {
    setProdSize(size);
  };

  const newCartItem = {
    product_id: product?.id,
    quantity: inputValue,
    user_id: user?.id,
    product_name: product?.product_name,
    product_price: product?.product_price,
    imageUrl_1: product?.imageUrl_1,
    size: prodSize,
    timestamp: Date.now(),
  };

  const handleAddToCart = () => {
    AddToCart(newCartItem);
    setPopUpMessage("addedToCart");
    setPopUpVisible(true);
    setTimeout(() => {
      setPopUpVisible(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("products_store")
          .select("*")
          .eq("id", productId)
          .single();

        if (error) throw error; // Better error handling
        if (!data) throw new Error("Product not found");

        setProduct(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) return <Loading />;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  if (!product) return <div className="p-8">Product not found</div>;

  return (
    <div className="px-6">
      <div className="md:grid grid-cols-2 gap-8 items-center ">
        <ViewedProduct
          product={product}
          littleImg={`size-15`}
          prodNameStyle={`text-lg`}
          btnStyle={`bg-black/5  text-white`}
        />

        <div>
          <div className=" my-6 md:my-0">
            <p className="text-lg uppercase tracking-wider md:text-2xl md:mb-4">
              description
            </p>
            <p className="font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              facilis rerum soluta, est laborum rem quaerat error. Rem, quia a
              dicta corporis veniam aliquid labore, debitis officiis
              necessitatibus accusamus iusto asperiores assumenda, architecto
              esse temporibus facere! Facere, sequi a iusto asperiores impedit
              assumenda harum, unde veritatis incidunt pariatur consectetur
              magni.
            </p>
          </div>

          <p className="mt-4 md:mt-8">sizes:</p>
          <div className="flex gap-4 md:mt-4 ">
            {product.sizes.map((size) => (
              <button
                className={` px-4 py-2 w-fit ${prodSize === size ? "border-2 border-black" : "border"} size-8 text-sm  uppercase flex justify-center items-center cursor-pointer`}
                key={size}
                onClick={() => handleSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          {prodSize === null && (
            <p className="text-xs text-red-500 italic mt-2">*choose size*</p>
          )}
          <div className="border flex items-center w-30 h-10 justify-between mt-4">
            <button
              className="bg-white text-4xl size-8 flex items-center justify-center cursor-pointer "
              onClick={() => {
                setInputValue((prev) => prev - 1);
              }}
              disabled={inputValue <= 1 ? true : false}
            >
              <Icon name="minus" className="w-5 text-black " />
            </button>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="number"
              className="no-spin focus:outline-none focus:ring-none w-8 text-center text-sm "
            />
            <button
              className="bg-white text-xl size-8  flex items-center justify-center cursor-pointer"
              onClick={() => {
                setInputValue((prev) => Number(prev) + 1);
              }}
            >
              <Icon name="add" className="w-5 text-black" />
            </button>
          </div>

          <p className="mt-6 text-gray-600">
            Free delivery applies to Lagos orders of ₦200,000 and above
          </p>

          <Button
            className=" bg-black text-white uppercase hover:text-blue-300 w-full p-3 border my-4 cursor-pointer"
            onClick={() => {
              handleAddToCart();
              // console.log(product);
            }}
            disabled={prodSize === null ? true : false}
          >
            add to cart
          </Button>
        </div>
      </div>
      <p className="text-center mt-10 font-light text-2xl uppercase mb-8 ">
        you may also like
      </p>
      <ProdGridSimple
        tableName="products_store"
        limit="4"
        category={product.category}
        notEqual={product.id}
      />
    </div>
  );
};

export default ViewProductPage;
