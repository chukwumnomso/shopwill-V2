import Icon from "./Icon";

const TopProductFilter = ({ onClick, modalOpen }) => {
  return (
    <div>
      <div className="flex justify-between h-15 font-[jost] uppercase cursor-pointer mb-15 border-b">
        <div
          className="flex justify-center items-center w-full hover:text-black text-gray-700 border-r"
          // onClick={onClick}
        >
          filter
        </div>
        <div
          className="flex justify-center items-center w-full hover:text-black text-gray-700 gap-4 "
          onClick={onClick}
        >
          sort by
          <div
            className=" transition:transform duration-500"
            style={{
              transform: modalOpen ? "rotate(180deg)" : "rotate(0deg)",
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
