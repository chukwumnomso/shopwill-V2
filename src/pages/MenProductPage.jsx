import { useEffect, useState } from "react";

import ProdGridPaginated from "../components/ProductGridPaginated";
import TopProductFilter from "../components/TopProductFilter";
import SortBy from "../components/SortBy";
import { useModal } from "../context/ModalContext";
import SideFilter from "../components/SideFilter";

const MenProductPage = () => {
  // const size = (sizes) => {};

  return (
    <div className=" overflow-hidden ">
      <TopProductFilter />
      <SideFilter gender="male" />
      <SortBy />
      <ProdGridPaginated tableName="products_store" gender="male" />
    </div>
  );
};

export default MenProductPage;
