import { useState } from "react";

import ProdGridPaginated from "../components/ProductGridPaginated";
import TopProductFilter from "../components/TopProductFilter";
import SideSortFilter from "../components/SideSortFilter";
import { useModal } from "../context/ModalContext";

const WomenProductPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setModalOpen, modalOpen } = useModal();

  const handleClick = () => {
    setIsOpen(true);
    setModalOpen(true);
  };
  return (
    <div className="relative overflow-x-hidden">
      <TopProductFilter onClick={handleClick} modalOpen={modalOpen} />
      <ProdGridPaginated tableName="women_store" />
      <SideSortFilter isOpen={isOpen} />
    </div>
  );
};

export default WomenProductPage;
