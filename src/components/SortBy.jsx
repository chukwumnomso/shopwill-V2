import { useModal } from "../context/ModalContext";
import Icon from "./Icon";

const SortBy = () => {
  const { modalOpen, setModalOpen, isOpen, setIsOpen } = useModal();

  return (
    <div
      className=" border overflow-hidden fixed  bottom-0 right-0  w-full bg-white z-50"
      style={{
        transform: isOpen && modalOpen ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <div className="font-[jost] pt-5 pb-10 px-10 text-gray-700 ">
        <div className="flex justify-between items-center  mb-10 font-bold uppercase">
          sort by
          <button
            onClick={() => {
              setModalOpen(false);
              setIsOpen(false);
            }}
          >
            <Icon
              name="cancel"
              className="size-10  cursor-pointer hover:rotate-90 transition-transform duration-300 hover:text-black"
            />
          </button>
        </div>
        <ul className="flex flex-col gap-4 cursor-pointer list-disc">
          <li className="hover:text-black">Alphabetically, A - Z</li>
          <li className="hover:text-black">Alphabetically, Z - A</li>
          <li className="hover:text-black">Price, low - high</li>
          <li className="hover:text-black">Price, high - low</li>
          <li className="hover:text-black">Date,new - old</li>
          <li className="hover:text-black">Date, old - new</li>
        </ul>

        <p></p>
      </div>
    </div>
  );
};

export default SortBy;
