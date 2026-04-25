import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useModal } from "./ModalContext";

const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
  const { setModalOpen } = useModal();
  const [navOpen, setNavOpen] = useState(false);
  const [navSlide, setNavSlide] = useState("");
  const [activeNav, setActiveNav] = useState(true);
  const navigate = useNavigate();

  const closeNavBar = () => {
    setNavOpen(false);
    toggleNavSlide("");
    setActiveNav(true);
  };

  const toggleNavSlide = (select) => {
    setNavSlide(select);
    setActiveNav(false);
  };

  const handleCategory = (path, gender, category) => {
    navigate(`${path}?gender=${gender}&cat=${category}&page=1`);
    setNavOpen(false);
    setNavSlide("");
    setActiveNav(true);
    setModalOpen(false);
  };

  // const handleGenderPage = (path, gender) => {
  //   navigate(`${path}?gender=${gender}&page=1`);
  //   setNavOpen(false);
  //   setNavSlide("");
  //   setActiveNav(true);
  //   setModalOpen(false);
  // };

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
        // handleGenderPage,
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
