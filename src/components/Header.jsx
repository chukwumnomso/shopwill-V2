import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function Header() {
  const { cart, setCartDrawerOpen } = useCart();
  const { wishList } = useWishList();
  const { setNavOpen } = useNavBar();
  const { setModalOpen } = useModal();
  const { searchOpen, setSearchOpen } = useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();

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
          <Button className="cursor-pointer">
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
    </>
  );
}
