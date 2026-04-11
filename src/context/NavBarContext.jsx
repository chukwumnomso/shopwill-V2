import { createContext, useContext, useState } from "react";

const NavBarContext = createContext();

export const NavBarProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavBarContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
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
