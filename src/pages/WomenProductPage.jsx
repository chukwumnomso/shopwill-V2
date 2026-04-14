import { useState } from "react";

import ProdGridPaginated from "../components/ProductGridPaginated";
import TopProductFilter from "../components/TopProductFilter";
import SortBy from "../components/SortBy";
import { useModal } from "../context/ModalContext";

const WomenProductPage = () => {
  const { setModalOpen, modalOpen, isOpen, setIsOpen } = useModal();

  const handleClick = () => {
    setIsOpen(true);
    setModalOpen(true);
  };
  return (
    <div className="relative overflow-x-hidden">
      <TopProductFilter onClick={handleClick} modalOpen={modalOpen} />
      <SortBy isOpen={isOpen} />
      <ProdGridPaginated tableName="women_store" />
    </div>
  );
};

export default WomenProductPage;
