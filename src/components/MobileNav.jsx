import { useNavigate, Link } from "react-router-dom";

import MobileNavSlide from "./MobileNavSlide";
import Icon from "./Icon";
import ShopLogo from "./ShopLogo";
import { useNavBar } from "../context/NavBarContext";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";
import { signOut } from "../supabaseAuth/supabaseAuth";
import { useModal } from "../context/ModalContext";

const MobileNav = () => {
  const {
    navSlide,
    toggleNavSlide,
    setActiveNav,
    activeNav,
    navOpen,
    setNavOpen,
  } = useNavBar();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setModalOpen } = useModal();

  const handleActiveNav = () => {
    toggleNavSlide("");
    setActiveNav((prev) => !prev);
  };
  const handleCloseNav = () => {
    setNavOpen(false);
    toggleNavSlide("");
    setActiveNav(true);
    setModalOpen(false);
  };

  const handleLogout = () => {
    signOut(navigate);
    handleCloseNav();
  };
  const handleLogin = () => {
    navigate("/signin");
    handleCloseNav();
  };

  return (
    <>
      <div
        className="h-full text-black bg-white fixed z-50 w-[85%] top-0 left-0 overflow-y-auto capitalize font-[jost] pt-5 px-4 overflow-x-hidden"
        style={{
          transform: navOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className="mb-20 flex items-center justify-between uppercase ">
          <p
            onClick={() => {
              handleCloseNav();
            }}
          >
            <Link to="/">home</Link>
          </p>
          <ShopLogo />
          <button
            onClick={() => {
              handleCloseNav();
              setModalOpen(false);
            }}
          >
            <Icon
              name="cancel"
              className="size-10  cursor-pointer hover:rotate-90 transition-transform duration-300"
            />
          </button>
        </div>

        {/* ////////////////////////////////////////// */}
        <div
          className="bg-white text-black font-[jost] cursor-pointer"
          style={{
            opacity: activeNav ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <ul>
            <li
              className="flex items-center justify-between border-b h-15 hover:text-gray-500"
              onClick={() => {
                toggleNavSlide("best seller");
              }}
            >
              best seller
              <Icon name="chevronRight" className="size-5 " />
            </li>
            <li
              className="flex items-center justify-between     border-b text-black h-15 hover:text-gray-500"
              onClick={() => {
                toggleNavSlide("men");
              }}
            >
              <Link
                className="hover:underline"
                to="/menproducts"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseNav();
                }}
              >
                men
              </Link>

              <Icon name="chevronRight" className="size-5 " />
            </li>
            <li
              className="flex items-center justify-between    border-b  h-15 hover:text-gray-500"
              onClick={() => {
                toggleNavSlide("women");
              }}
            >
              <Link
                to="/womenproducts"
                className="hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseNav();
                }}
              >
                women
              </Link>
              <Icon name="chevronRight" className="size-5 " />
            </li>
            <li
              className="flex items-center justify-between  border-b  h-15 hover:text-gray-500"
              onClick={() => {
                toggleNavSlide("kids");
              }}
            >
              kids
              <Icon name="chevronRight" className="size-5 " />
            </li>
          </ul>
        </div>

        <MobileNavSlide
          style={{
            transform:
              navSlide === "best seller" ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
          }}
          head="best seller"
          Tshirts="T-shirts"
          Pants="Pants"
          Shorts="Shorts"
          Hoodies="Hoodies"
          onClick={handleActiveNav}
          Accessories="Accessories"
        />

        <MobileNavSlide
          style={{
            transform:
              navSlide === "men" ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
          }}
          head="Men"
          Tshirts="T-shirts"
          Pants="Pants"
          Shorts="Shorts"
          Hoodies="Hoodies"
          Accessories="Accessories"
          onClick={handleActiveNav}
        />

        <MobileNavSlide
          style={{
            transform:
              navSlide === "women" ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
          }}
          head="Women"
          Tshirts="T-shirts"
          Pants="Pants"
          Shorts="Shorts"
          Hoodies="Hoodies"
          Accessories="Accessories"
          onClick={handleActiveNav}
        />
        <MobileNavSlide
          style={{
            transform:
              navSlide === "kids" ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
          }}
          head="Kids"
          Tshirts="T-shirts"
          Pants="Pants"
          Shorts="Shorts"
          Hoodies="Hoodies"
          Accessories="Accessories"
          onClick={handleActiveNav}
        />

        <Button
          className="w-[90%] h-10 bg-black text-white absolute bottom-7 font-[jost]  text-xl right-0 left-0 mx-auto uppercase hover:text-blue-300 transition-color duration-300 cursor-pointer"
          onClick={() => {
            user ? handleLogout() : handleLogin();
          }}
        >
          {user ? "logout" : "login"}
        </Button>
      </div>
    </>
  );
};

export default MobileNav;
