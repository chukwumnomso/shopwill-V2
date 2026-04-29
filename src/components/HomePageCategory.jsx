import react from "react";
import { useNavigate } from "react-router-dom";

import tShirt from "../assets/images/category-images/T-shirt.webp";
import joggers from "../assets/images/category-images/joggers.jpg";
import hoodie from "../assets/images/category-images/hoodie.webp";
import accessory from "../assets/images/vooglam-eyewear.jpg";

const categories = [
  {
    name: "T-Shirts",
    slug: "t-shirt",
    image: tShirt,
  },
  { name: "Hoodies", slug: "hoodie", image: hoodie },
  { name: "Pants", slug: "pant", image: joggers },
  { name: "accessories", slug: "bag", image: accessory },
];

const HomePageCategory = () => {
  const navigate = useNavigate();
  return (
    <div className="my-15 py-16 bg-gray-50">
      {/* Soft gray background for elegant separation */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Elegant heading - matches your hero tone */}
        <div className="text-center mb-12 font-[jost]">
          <h2 className="text-3xl font-semibold text-gray-900">
            Shop by Category
          </h2>
          <p className="text-gray-600 mt-3">
            Timeless pieces curated for the modern era
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 font-[jost]">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative aspect-4/3 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              onClick={() => navigate(`/products?&page=1&cat=${category.slug}`)} // or use React Router Link
            >
              <img
                src={category.image} // e.g. "/images/categories/hoodies.jpg"
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Subtle dark overlay for text readability */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-8 left-6 text-white">
                <h3 className="text-2xl font-medium tracking-wide">
                  {category.name}
                </h3>
                <p className="text-sm text-white/80 mt-1">Explore →</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageCategory;
