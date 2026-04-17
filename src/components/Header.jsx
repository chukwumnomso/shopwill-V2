import { useEffect, useState } from "react";

import Icon from "./Icon";
import ShopLogo from "./ShopLogo";
import CartIcon from "./CartIcon";
import Button from "./Button";
import { signOut } from "../supabaseAuth/supabaseAuth";
import { useNavigate } from "react-router-dom";
import { useNavBar } from "../context/NavBarContext";
import { useModal } from "../context/ModalContext";
import SearchBar from "./SearchBar";
import { useSearch } from "../context/SearchContext";

export default function Header() {
  const { setNavOpen } = useNavBar();
  const { setModalOpen } = useModal();
  const { setSearchOpen, searchProduct, searchValue } = useSearch();

  return (
    <>
      <div className="bg-black h-6  text-white text-[0.6rem] flex items-center justify-center font-[montserrat] uppercase font-semibold sticky -top-7 left-0 z-30 w-full">
        <p> make purchase@shopwill</p>
      </div>
      <header className="flex justify-between px-4 h-20 items-center sticky -top-2 left-0 z-30 w-full bg-white">
        <div
          className="flex gap-6 items-center  w-full"
          onClick={() => {
            setSearchOpen(false);
          }}
        >
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
          <ShopLogo />
        </div>
        <div className="flex gap-4 items-center ">
          <Button
            className="cursor-pointer"
            onClick={() => {
              setSearchOpen((prev) => !prev);
              setModalOpen(true);
            }}
          >
            <Icon name="search" className="size-6 text-black" />
          </Button>
          <Button className="cursor-pointer">
            <CartIcon name="fav" className="relative">
              0
            </CartIcon>
          </Button>
          <Button className="cursor-pointer">
            <CartIcon name="cart" className={"relative"}>
              0
            </CartIcon>
          </Button>
        </div>
      </header>
      <SearchBar />
    </>
  );
}
