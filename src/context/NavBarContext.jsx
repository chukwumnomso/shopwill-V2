import { createContext, useContext, useEffect, useState } from "react";
import { useModal } from "./ModalContext";
import { useCategory } from "./CategoryContext";

const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
  const { setModalOpen } = useModal();
  const { category, setCategory, setProductType } = useCategory();

  const [navOpen, setNavOpen] = useState(false);
  const [navSlide, setNavSlide] = useState("");
  const [activeNav, setActiveNav] = useState(true);

  const closeNavBar = () => {
    setNavOpen(false);
    toggleNavSlide("");
    setActiveNav(true);
  };

  const toggleNavSlide = (select) => {
    setNavSlide(select);
    setActiveNav(false);
  };

  const handleCategory = (category) => {
    setCategory(category);
    setNavOpen(false);
    toggleNavSlide("");
    setActiveNav(true);
    setModalOpen(false);
    setProductType("all");
  };

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [navOpen]);

  return (
    <NavBarContext.Provider
      value={{
        navOpen,
        setNavOpen,
        navSlide,
        toggleNavSlide,
        activeNav,
        setActiveNav,
        closeNavBar,
        handleCategory,
        category,
        setCategory,
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
};

const useNavBar = () => {
  const context = useContext(NavBarContext);

  if (!context) {
    throw new Error("useNavBar must be used within a NavBarProvider");
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useNavBar, NavBarContext };
