import Icon from "./Icon";
import { useModal } from "../context/ModalContext";

const TopProductFilter = () => {
  const { setModalOpen, setIsOpen, isOpen, setClosedFilter } = useModal();

  const handleClick = () => {
    setIsOpen(true);
    setModalOpen(true);
  };
  const handleOpenSideFilter = () => {
    setModalOpen(true);
    setClosedFilter(false);
  };

  return (
    <div>
      <div className="flex justify-between h-15 font-[jost] uppercase cursor-pointer mb-15 border-b">
        <div
          className="flex justify-center items-center w-full hover:text-black text-gray-700 border-r"
          onClick={handleOpenSideFilter}
        >
          filter
        </div>
        <div
          className="flex justify-center items-center w-full hover:text-black text-gray-700 gap-4 "
          onClick={handleClick}
        >
          sort by
          <div
            className=" transition:transform duration-500"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <Icon name="arrowDown" className="size-6 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProductFilter;
