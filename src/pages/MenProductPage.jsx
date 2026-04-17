import { useEffect, useState } from "react";

import ProdGridPaginated from "../components/ProductGridPaginated";
import TopProductFilter from "../components/TopProductFilter";
import SortBy from "../components/SortBy";
import { useModal } from "../context/ModalContext";
import SideFilter from "../components/SideFilter";

const MenProductPage = () => {
  // const size = (sizes) => {};

  return (
    <div className=" overflow-x-hidden ">
      <TopProductFilter />
      <SideFilter />
      <SortBy />
      <ProdGridPaginated tableName="products_store" gender="male" />
    </div>
  );
};

export default MenProductPage;
