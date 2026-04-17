const SearchProductComponent = ({ product }) => {
  return (
    <div className="flex items-center gap-4 mt-4 border-b">
      <img
        src={product.imageUrl_1}
        alt={product.product_name}
        className="size-15"
      />
      <div>
        <p className="tracking-widest">{product.product_name}</p>
        <p className="flex gap-4 text-red-500 tracking-wide mt-2 ">
          ₦{product.product_price.toLocaleString()}
          {product.discounts}
        </p>
      </div>
    </div>
  );
};

export default SearchProductComponent;
