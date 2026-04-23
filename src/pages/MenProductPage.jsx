import { useEffect, useState } from "react";

import ProdGridPaginated from "../components/ProductGridPaginated";
import TopProductFilter from "../components/TopProductFilter";
import SortBy from "../components/SortBy";
import { useModal } from "../context/ModalContext";
import SideFilter from "../components/SideFilter";
import Heading from "../components/Heading";

const MenProductPage = () => {
  // const size = (sizes) => {};

  return (
    <div className=" overflow-hidden ">
      <TopProductFilter />
      <SideFilter gender="male" />
      <SortBy />
      <Heading className="text-xl flex items-center justify-center font-[jost] uppercase my-10 tracking-wider font-light">
        for men
      </Heading>
      <ProdGridPaginated tableName="products_store" gender="male" />
    </div>
  );
};

export default MenProductPage;
