import { useState } from "react";

function ViewedProduct({ product }) {
  const [index, setIndex] = useState(0);
  const images = [product.imageUrl_1, product.imageUrl_2]; // array of image URLs from supabase

  if (!product) {
    return <div>loading</div>;
  }

  return (
    <div className="border rounded-lg p-4 w-80">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => setIndex((index - 1 + images.length) % images.length)}
          className="bg-gray-800 text-white px-3 py-1 rounded"
        >
          ◀
        </button>

        <div className="w-48 h-48 overflow-hidden border rounded">
          <img
            src={images[index]}
            className="w-full h-full object-cover"
            alt={product.product_name}
          />
        </div>

        <button
          onClick={() => setIndex((index + 1) % images.length)}
          className="bg-gray-800 text-white px-3 py-1 rounded"
        >
          ▶
        </button>
      </div>

      <h3 className="font-bold">{product.product_name}</h3>
      <p className="text-gray-600">${product.product_price}</p>
    </div>
  );
}

export default ViewedProduct;
