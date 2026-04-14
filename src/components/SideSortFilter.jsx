import { useModal } from "../context/ModalContext";

const SideSortFilter = ({ isOpen }) => {
  const { modalOpen } = useModal();

  return (
    <div
      className=" border overflow-hidden fixed top-41 right-0  w-[50%] bg-white z-50"
      style={{
        transform: isOpen && modalOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <div className="font-[jost] py-10 px-4 text-gray-700 ">
        <ul className="flex flex-col gap-4 cursor-pointer">
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

export default SideSortFilter;
