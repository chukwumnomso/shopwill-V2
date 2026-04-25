import { useUrlParams } from "../context/UrlParamsContext";
import Icon from "./Icon";

const ShowFilter = ({ filter, param, onClick }) => {
  return (
    <div className="border h-8 w-fit px-2 border-gray-300 text-sm font-[jost] capitalize  flex items-center gap-1 text-gray-500">
      <button
        className=" hover:text-black cursor-pointer"
        onClick={() => onClick(param, filter)}
      >
        <Icon name="cancel" className="size-4" />
      </button>
      {filter.toUpperCase()}
    </div>
  );
};

export default ShowFilter;
