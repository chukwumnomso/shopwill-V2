import { useEffect, useState } from "react";

import ProdGridPaginated from "../components/ProductGridPaginated";
import TopProductFilter from "../components/TopProductFilter";
import SortBy from "../components/SortBy";
import { useModal } from "../context/ModalContext";

const MenProductPage = () => {
  const { setModalOpen, modalOpen, setIsOpen, isOpen } = useModal();

  const handleClick = () => {
    setIsOpen(true);
    setModalOpen(true);
  };

  return (
    <div className=" overflow-x-hidden ">
      <TopProductFilter modalOpen={modalOpen} onClick={handleClick} />
      <SortBy isOpen={isOpen} />
      <ProdGridPaginated tableName="men_store" />
    </div>
  );
};

export default MenProductPage;
