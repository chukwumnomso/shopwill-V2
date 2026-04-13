import { Outlet } from "react-router-dom";
import supabase from "./supabaseClient";

import Header from "./Header";
import PopUp from "./PopUp";
import { usePopUp } from "../context/PopUpContext";
import SideCart from "./SideCart";
import MobileNav from "./MobileNav";
import Icon from "./Icon";
import ServicesSlider from "./ServicesSlider";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

const AppLayout = () => {
  const { popUpMessage, setPopUpVisible } = usePopUp();

  return (
    <div className="relative">
      <PopUp>
        <Icon name="check" className="mr-4 size-8 text-green-500" />
        {popUpMessage === "addedToCart"
          ? "item added to cart "
          : popUpMessage === "addedToWishlist"
            ? "item added to wishlist "
            : popUpMessage === "loginRequired"
              ? "please login to add to wishlist"
              : popUpMessage === "removedFromWishlist"
                ? "item removed from wishlist "
                : ""}
        <Icon
          name="cancel"
          className="ml-4 size-6 text-gray-200 hover:rotate-90 cursor-pointer transition-transform duration-300"
          onClick={() => {
            setPopUpVisible(false);
          }}
        />
      </PopUp>

      <Header />
      {/* <SideCart /> */}
      <MobileNav />
      <Outlet />
      <ServicesSlider />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default AppLayout;
