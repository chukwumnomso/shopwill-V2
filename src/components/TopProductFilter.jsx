import Icon from "./Icon";
import { useModal } from "../context/ModalContext";

const TopProductFilter = () => {
  const { setModalOpen, setIsOpen, isOpen, setFilterOpen } = useModal();

  const handleClick = () => {
    setIsOpen(true);
    setModalOpen(true);
  };
  const handleOpenSideFilter = () => {
    setModalOpen(true);
    setFilterOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between h-10 font-[jost] uppercase cursor-pointer mb-4 border-gray-400 border-b tracking-widest text-sm">
        <div
          className="flex justify-center items-center w-full hover:text-black text-gray-500 border-r border-gray-400 gap-4"
          onClick={handleOpenSideFilter}
        >
          filter
          <Icon name="sort" className="size-4" />
        </div>
        <div
          className="flex justify-center items-center w-full hover:text-black text-gray-500 gap-4 "
          onClick={handleClick}
        >
          sort by
          <div
            className=" transition:transform duration-500"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <Icon name="arrowDown" className="size-4 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProductFilter;
