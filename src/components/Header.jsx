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
import { signOut } from "../supabaseAuth/supabaseAuth";

export default function Header() {
  const { cart, setCartDrawerOpen } = useCart();
  const { wishList } = useWishList();
  const { setNavOpen } = useNavBar();
  const { setModalOpen } = useModal();
  const { searchOpen, setSearchOpen, searchResult, searchQuery } = useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const url = window.location;

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
        className="flex  justify-between px-4 h-20 items-center sticky -top-2 left-0  w-full bg-white"
        style={{ zIndex: searchOpen ? 50 : 30 }}
      >
        <div className="flex  items-center">
          <Button
            className="cursor-pointer md:hidden"
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
        <nav
          className="w-full h-full  md:flex justify-center items-center font-[jost] text-sm uppercase cursor-pointer hidden "
          onClick={() => {
            setModalOpen(false);
            setSearchOpen(false);
          }}
        >
          <ul className="flex items-center  justify-center gap-10 w-full">
            <li className="hover:underline " onClick={() => navigate("/")}>
              home
            </li>
            <li className="hover:underline group relative">
              <p className="flex gap-1 items-center">
                men <Icon name="arrowDown" className="size-4 text-black" />
              </p>
              <div className="absolute top-10 -left-10 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white w-50 invisible group-hover:visible  ">
                <p
                  onClick={() => {
                    navigate(`/products?gender=male&page=1&cat=t-shirt`);
                  }}
                  className="block px-4 py-2 hover:underline text-xs text-gray-500 hover:text-black uppercase w-fit"
                >
                  t-shirt
                </p>
                <p
                  onClick={() => {
                    navigate(`/products?gender=male&page=1&cat=pant`);
                  }}
                  className="block px-4 py-2 hover:underline text-xs text-gray-500 hover:text-black uppercase w-fit"
                >
                  pant
                </p>
                <p
                  onClick={() => {
                    navigate(`/products?gender=male&page=1&cat=short`);
                  }}
                  className="block px-4 py-2 hover:underline text-xs text-gray-500 hover:text-black uppercase w-fit"
                >
                  short
                </p>
                <p
                  onClick={() => {
                    navigate(`/products?gender=male&page=1&cat=hoodie`);
                  }}
                  className="block px-4 py-2 hover:underline text-xs text-gray-500 hover:text-black uppercase w-fit"
                >
                  hoodie
                </p>
                <p
                  onClick={() => {
                    navigate(`/products?gender=male&page=1&cat=jacket`);
                  }}
                  className="block px-4 py-2 hover:underline text-xs text-gray-500 hover:text-black uppercase w-fit"
                >
                  jacket
                </p>
              </div>
            </li>
            <li className="hover:underline group relative">
              <p className="flex gap-1 items-center">
                women <Icon name="arrowDown" className="size-4 text-black" />
              </p>
              <div className="absolute top-10 -left-10 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white w-50 invisible group-hover:visible  ">
                <p
                  onClick={() => {
                    navigate(`/products?gender=female&page=1&cat=top`);
                  }}
                  className="block px-4 py-2 hover:underline text-xs text-gray-500 hover:text-black uppercase w-fit"
                >
                  top
                </p>
                <p
                  onClick={() => {
                    navigate(`/products?gender=female&page=1&cat=leggings`);
                  }}
                  className="block px-4 py-2 hover:underline text-xs text-gray-500 hover:text-black uppercase w-fit"
                >
                  leggings
                </p>
                <p
                  onClick={() => {
                    navigate(`/products?gender=female&page=1&cat=skirt`);
                  }}
                  className="block px-4 py-2 hover:underline text-xs text-gray-500 hover:text-black uppercase w-fit"
                >
                  skirt
                </p>
                <p
                  onClick={() => {
                    navigate(`/products?gender=female&page=1&cat=hoodie`);
                  }}
                  className="block px-4 py-2 hover:underline text-xs text-gray-500 hover:text-black uppercase w-fit"
                >
                  hoodie
                </p>
                <p
                  onClick={() => {
                    navigate(`/products?gender=male&page=1&cat=bag`);
                  }}
                  className="block px-4 py-2 hover:underline text-xs text-gray-500 hover:text-black uppercase w-fit"
                >
                  bag
                </p>
              </div>
            </li>
            <li className="hover:underline " onClick={() => navigate("")}>
              about us
            </li>
          </ul>
        </nav>

        <div className="flex gap-4 items-center md:gap-8 ">
          <Button
            className="cursor-pointer"
            onClick={() => {
              setSearchOpen((prev) => !prev);
              setModalOpen((prev) => !prev);
            }}
          >
            <Icon name="search" className="size-6 text-black" />
          </Button>

          <Button className="cursor-pointer group relative hidden md:block">
            <Icon name="user" className="size-6" />
            <div className="absolute top-10 -left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white w-15 invisible group-hover:visible   ">
              <span
                className="text-xs uppercase font-[jost]"
                onClick={() => {
                  user ? signOut(navigate) : navigate("/signin");
                }}
              >
                {user ? "signout" : "login"}
              </span>
            </div>
          </Button>

          <Button
            className="cursor-pointer"
            onClick={() => {
              navigate("/wishlist");
            }}
          >
            <CartIcon name="fav" className="relative  ">
              {user ? wishList : 0}
            </CartIcon>
          </Button>
          <Button
            className="cursor-pointer"
            onClick={handleCartOpen}
            disabled={url.pathname === "/cartpage"}
          >
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
