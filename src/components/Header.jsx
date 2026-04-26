import { useNavigate, Link } from "react-router-dom";

import Icon from "./Icon";
import ShopLogo from "./ShopLogo";
import CartIcon from "./CartIcon";
import Button from "./Button";
import { useCart } from "../context/CartContext";
import { useNavBar } from "../context/NavBarContext";
import { useModal } from "../context/ModalContext";
import SearchBar from "./SearchBar";
import { useSearch } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";
import { useWishList } from "../context/WishedListContext";
import SearchProductComponent from "./SearchProductComponent";

export default function Header() {
  const { cart, setCartDrawerOpen } = useCart();
  const { wishList } = useWishList();
  const { setNavOpen } = useNavBar();
  const { setModalOpen } = useModal();
  const { searchOpen, setSearchOpen, searchResult, searchQuery } = useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const result = searchResult?.slice(0, 5);

  const handleCartOpen = () => {
    setModalOpen(true);
    setCartDrawerOpen(true);
  };

  return (
    <>
      <div
        className="bg-black h-6  text-white text-[0.6rem] flex items-center justify-center font-[montserrat] uppercase font-semibold sticky -top-7 left-0 z-30 w-full"
        style={{ zIndex: searchOpen ? 50 : 30 }}
      >
        <p> make purchase@shopwill</p>
      </div>
      <header
        className="flex justify-between px-4 h-20 items-center sticky -top-2 left-0  w-full bg-white"
        style={{ zIndex: searchOpen ? 50 : 30 }}
      >
        <div className="flex  items-center">
          <Button
            className="cursor-pointer"
            onClick={() => {
              setNavOpen((prev) => !prev);
              setModalOpen(true);
              setSearchOpen(false);
            }}
          >
            <Icon name="menu" />
          </Button>
          <ShopLogo
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div
          className="w-full h-full"
          onClick={() => {
            setModalOpen(false);
            setSearchOpen(false);
          }}
        ></div>
        <div className="flex gap-4 items-center ">
          <Button
            className="cursor-pointer"
            onClick={() => {
              setSearchOpen((prev) => !prev);
              setModalOpen((prev) => !prev);
            }}
          >
            <Icon name="search" className="size-6 text-black" />
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => {
              navigate("/wishlist");
            }}
          >
            <CartIcon name="fav" className="relative">
              {user ? wishList : 0}
            </CartIcon>
          </Button>
          <Button className="cursor-pointer" onClick={handleCartOpen}>
            <CartIcon name="cart" className={"relative"}>
              {cart}
            </CartIcon>
          </Button>
        </div>
      </header>

      <SearchBar />
      {searchResult?.length > 0 ? (
        <div
          className={`fixed z-50 overflow-auto p-4  mt-10 w-full max-h-[80%] bg-white  ${searchOpen ? "translate-y-0" : "-translate-y-200"} ${searchOpen ? "z-50" : "z-10"} ${searchQuery === "" ? "opacity-0" : "opacity-100"} transition-transform duration-300`}
        >
          <p className="uppercase text-sm">({searchResult.length})products</p>
          {result.map((productResult) => (
            <SearchProductComponent
              key={productResult.id}
              product={productResult}
              setSearch={setSearchOpen}
              setModal={setModalOpen}
            />
          ))}
          <Link to={`/searched?q=${searchQuery}`}>
            <Button
              className="px-4 uppercase mt-4 bg-black h-10 text-white hover:text-blue-300 cursor-pointer"
              onClick={() => {
                setSearchOpen(false);
                setModalOpen(false);
              }}
            >
              view all results
            </Button>
          </Link>
        </div>
      ) : (
        <p
          className={`fixed z-50 flex items-center justify-center px-4 font-[jost] h-10 tracking-wider  uppercase font-light mt-10 w-full max-h-[70%] bg-white ${searchQuery === "" || (searchQuery !== "" && searchResult === null) ? "hidden" : "block"} ${searchOpen ? "translate-y-0" : "-translate-y-200"} transition-transform duration-300`}
        >
          No results could be found 😐
        </p>
      )}
    </>
  );
}
