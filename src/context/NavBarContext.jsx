import { createContext, useContext, useEffect, useState } from "react";

const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
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
