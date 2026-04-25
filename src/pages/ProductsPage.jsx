// import { useEffect, useState } from "react";

import ProdGridPaginated from "../components/ProductGridPaginated";
import TopProductFilter from "../components/TopProductFilter";
import SortBy from "../components/SortBy";
// import { useModal } from "../context/ModalContext";
import SideFilter from "../components/SideFilter";
import Heading from "../components/Heading";
import { useUrlParams } from "../context/UrlParamsContext";
const ProductsPage = () => {
  const { category, gender } = useUrlParams();

  return (
    <div className=" overflow-hidden ">
      <TopProductFilter />
      <SideFilter />
      <SortBy />
      <Heading className="text-xl flex items-center justify-center font-[jost] uppercase my-10 tracking-wider font-light">
        {`${gender} ${category ? "/" : ""} ${category}`}
      </Heading>
      <ProdGridPaginated tableName="products_store" />
    </div>
  );
};

export default ProductsPage;
