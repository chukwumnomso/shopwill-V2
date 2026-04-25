// import { useEffect, useState } from "react";

import ProdGridPaginated from "../components/ProductGridPaginated";
import TopProductFilter from "../components/TopProductFilter";
import SortBy from "../components/SortBy";
import SideFilter from "../components/SideFilter";
import Heading from "../components/Heading";
import { useUrlParams } from "../context/UrlParamsContext";
import ShowFilter from "../components/ShowFilter";
import { useFilter } from "../context/FilterContext";

const ProductsPage = () => {
  const { category, sizes, gender } = useUrlParams();
  const { removeFilter } = useFilter();

  return (
    <div className=" overflow-hidden ">
      <TopProductFilter />
      <SideFilter />
      <SortBy />
      <Heading className="text-lg flex items-center justify-center font-[jost] uppercase my-5 tracking-wider font-light">
        {`${gender} `}
      </Heading>
      <div className="flex gap-4 px-4 mb-4">
        {sizes.map((size) => (
          <ShowFilter
            key={size}
            filter={size}
            param={"size"}
            onClick={removeFilter}
          />
        ))}
        {category.map((cat) => (
          <ShowFilter
            key={cat}
            filter={cat}
            param={"cat"}
            onClick={removeFilter}
          />
        ))}
      </div>

      <ProdGridPaginated tableName="products_store" />
    </div>
  );
};

export default ProductsPage;
