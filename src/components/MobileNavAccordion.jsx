import Icon from "./Icon";

// h-10
const MobileNavAccordion = ({
  shirt,
  pants,
  shoes,
  item,
  title,
  index,
  isOpen,
  setIsOpen,
}) => {
  const listItems = [shirt, pants, shoes, ...Object.values(item)];

  const toggleAccordion = () => {
    setIsOpen(isOpen === index ? null : index);
  };

  return (
    <>
      <div
        className="px-4 h-15   mb-4  flex justify-between items-center font-[jost] gap-4 font-bold text-lg uppercase cursor-pointer hover:pl-5 transition-all duration-300"
        onClick={toggleAccordion}
      >
        <h1>{title}</h1>
        <button
          style={{
            transform: isOpen === index ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          <Icon
            name="chevronRight"
            className="size-4 text-gray-400  transition-transform duration-300"
          />
        </button>
      </div>
      <div
        className=" overflow-hidden font-medium text-lg text-gray-600 font-[jost] transition-all duration-300 ml-10 "
        style={{
          height: isOpen === index ? "7rem" : "0px",
          transition: "height 0.5s ease",
        }}
      >
        <ul>
          {listItems?.map((item, index) => (
            <ListItem key={index} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

function ListItem({ item }) {
  return (
    <div>
      <li className="hover:text-black cursor-pointer">{item}</li>
    </div>
  );
}

export default MobileNavAccordion;

//  <li className="hover:text-black cursor-pointer">Shirts</li>
//           <li className="hover:text-black cursor-pointer">Pants</li>
//           <li className="hover:text-black cursor-pointer">Shoes</li>
