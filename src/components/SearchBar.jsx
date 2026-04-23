import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Icon from "./Icon";
import { useSearch } from "../context/SearchContext";
import { useModal } from "../context/ModalContext";
import SearchProductComponent from "./SearchProductComponent";
import { useCategory } from "../context/CategoryContext";
import Loading from "../components/SmallLoadingSpinner";
import Button from "./Button";

const SearchBar = () => {
  const { setCategory } = useCategory();
  const {
    searchOpen,
    setSearchOpen,
    // searchResult,
    handleSearch,
    searchQuery,
    // isLoading,
  } = useSearch();
  const { setModalOpen } = useModal();
  const searchInputRef = useRef(null);
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div
      className={` fixed bg-white w-full border-t flex items-center justify-between px-4 ${searchOpen ? "translate-y-0" : "-translate-y-200"} ${searchOpen ? "z-40" : "z-10"} transition-transform duration-300`}
    >
      <div className="flex items-center gap-4 focus:border-transparent focus:ring-0 focus:ring-white w-full h-10">
        <Icon name="search" className="size-6" />
        <input
          value={searchQuery}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          ref={searchInputRef}
          type="text"
          placeholder="search for.."
          className="uppercase focus:outline-0 border w-full"
        />
      </div>
      <button
        onClick={() => {
          setSearchOpen((prev) => !prev);
          setModalOpen((prev) => !prev);
          console.log("yes");
        }}
      >
        <Icon name="cancel" className="size-6" />
      </button>
    </div>
  );
};

export default SearchBar;

//  <div
//       className=" px-4 overflow-y-auto  w-full  z-40 font-[jost] absolute transition-transform duration-300 bg-white "
//       style={{
//         transform: searchOpen ? "translateY(0)" : "translateY(-500%)",
//         maxHeight:
//           searchResult.length >= 1 && searchQuery !== "" ? "30rem" : "4rem",
//         display: searchOpen ? "block" : "hidden",
//         padding: searchOpen ? "1rem " : 0,
//         borderTop: searchOpen ? "solid 1px black" : "none",
//         zIndex: searchOpen ? "40" : "10",
//       }}
//     >
//       <div className="flex justify-between w-full items-center  ">
//         <div className="flex gap-4 w-full">
//           <Icon name="search" className="size-6 text-gray-500" />

//           <input
//             value={searchQuery}
//             onChange={(e) => handleSearch(e.target.value)}
//             ref={searchInputRef}
//             type="text"
//             placeholder="search for..."
//             className="w-full outline-none uppercase "
//           />
//         </div>

//         <button
//           className=" hover:rotate-90 transition-transform duration-500 cursor-pointer"
//           onClick={() => {
//             setSearchOpen(false);
//             setModalOpen(false);
//             // setSearchValue("");
//           }}
//         >
//           <Icon name="cancel" className="size-6 text-gray-500" />
//         </button>
//       </div>
//       {isLoading ? (
//         <Loading />
//       ) : (
//         <div>
//           {searchResult.length > 0 && searchQuery !== "" && (
//             <p className="my-8 text-lg uppercase underline">products</p>
//           )}

//           {searchResult < 1 && !isLoading && searchQuery !== "" && (
//             <p className={`${isLoading ? "opacity-0" : "opacity-1"}`}>nop</p>
//           )}
//           <div
//             className="transition-opacity duration-500 "
//             style={{ opacity: searchQuery ? 1 : 0 }}
//           >
//             {result.map((productResult) => (
//               <SearchProductComponent
//                 key={productResult.id}
//                 product={productResult}
//                 setSearch={setSearchOpen}
//                 setModal={setModalOpen}
//               />
//             ))}
//           </div>
//           {searchResult.length > 0 && searchQuery !== "" && (
//             <Link to={`/searched?q=${searchQuery}`}>
//               <Button
//                 className="px-4 uppercase mt-4 bg-black h-10 text-white hover:text-blue-300 cursor-pointer"
//                 onClick={() => {
//                   setSearchOpen(false);
//                   setModalOpen(false);
//                   setCategory("all");
//                 }}
//               >
//                 view all results
//               </Button>
//             </Link>
//           )}
//         </div>
//       )}
//     </div>
