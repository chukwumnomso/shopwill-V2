import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

import Header from "./Header";
import PopUp from "./PopUp";
import { usePopUp } from "../context/PopUpContext";
import SideCart from "./SideCart";
import MobileNav from "./MobileNav";
import Icon from "./Icon";
import ServicesSlider from "./ServicesSlider";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import Modal from "./Modal";
import { useModal } from "../context/ModalContext";
import { useNavBar } from "../context/NavBarContext";
import { useSearch } from "../context/SearchContext";

const AppLayout = () => {
  const { popUpMessage, setPopUpVisible } = usePopUp();
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const { modalOpen, setModalOpen, setIsOpen, setClosedFilter } = useModal();
  const { closeNavBar } = useNavBar();
  const { setSearchOpen } = useSearch();

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return (
    <>
      <div ref={mainRef} className="relative overflow-y-auto h-screen">
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
        {modalOpen && (
          <Modal
            onClick={() => {
              setModalOpen(false);
              setIsOpen(false);
              closeNavBar();
              setClosedFilter(true);
              setSearchOpen(false);
            }}
          />
        )}
        <Header />
        <MobileNav />
        <Outlet />
        <ServicesSlider />
        <Footer />
      </div>
      <BackToTop containerRef={mainRef} />
    </>
  );
};

export default AppLayout;

// import { Outlet } from "react-router-dom";
// import supabase from "./supabaseClient";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// import Header from "./Header";
// import PopUp from "./PopUp";
// import { usePopUp } from "../context/PopUpContext";
// import SideCart from "./SideCart";
// import MobileNav from "./MobileNav";
// import Icon from "./Icon";
// import ServicesSlider from "./ServicesSlider";
// import Footer from "./Footer";
// import BackToTop from "./BackToTop";

// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       window.scrollTo({ top: 0, behavior: "instant" });
//       document.documentElement.scrollTop = 0;
//       document.body.scrollTop = 0;
//     }, 100);

//     return () => clearTimeout(timeoutId);
//   }, [pathname]);

//   return null;
// }

// const AppLayout = () => {
//   const { popUpMessage, setPopUpVisible } = usePopUp();

//   return (
//     <div className="relative">
//       <ScrollToTop />
//       <PopUp>
//         <Icon name="check" className="mr-4 size-8 text-green-500" />
//         {popUpMessage === "addedToCart"
//           ? "item added to cart "
//           : popUpMessage === "addedToWishlist"
//             ? "item added to wishlist "
//             : popUpMessage === "loginRequired"
//               ? "please login to add to wishlist"
//               : popUpMessage === "removedFromWishlist"
//                 ? "item removed from wishlist "
//                 : ""}
//         <Icon
//           name="cancel"
//           className="ml-4 size-6 text-gray-200 hover:rotate-90 cursor-pointer transition-transform duration-300"
//           onClick={() => {
//             setPopUpVisible(false);
//           }}
//         />
//       </PopUp>

//       <Header />
//       {/* <SideCart /> */}
//       <MobileNav />
//       <Outlet />
//       <ServicesSlider />
//       <Footer />
//       <BackToTop />
//     </div>
//   );
// };

// export default AppLayout;
