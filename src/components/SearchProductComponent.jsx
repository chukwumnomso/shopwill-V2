import { Link } from "react-router-dom";

const SearchProductComponent = ({ product, setSearch, setModal }) => {
  return (
    <div className="flex items-center gap-4 mt-4  ">
      <img
        src={product.imageUrl_1}
        alt={product.product_name}
        className="size-15"
      />
      <div>
        <Link to={`product/${product.id}`}>
          <p
            className="tracking-widest text-sm text-gray-700 hover:text-black hover:underline"
            onClick={() => {
              setSearch(false);
              setModal(false);
            }}
          >
            {product.product_name}
          </p>
        </Link>
        <div className="mt-1 flex items-center gap-4 text-sm">
          <p className="flex gap-4 text-gray-800 tracking-wide   ">
            ₦{product.product_price.toLocaleString()}
          </p>
          <p className="text-gray-500 line-through font-light text-xs">
            {product.discounts
              ? `${product.discounts}% OFF ${(
                  (product.discounts / 100) * product.product_price +
                  product.product_price
                ).toLocaleString()}`
              : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchProductComponent;
