import React from "react";
import { createContext, useState, useContext } from "react";

const PopUpContext = createContext();

const PopUpProvider = ({ children }) => {
  const [popUpMessage, setPopUpMessage] = useState("");
  const [popUpVisible, setPopUpVisible] = useState(false);

  return (
    <PopUpContext.Provider
      value={{ setPopUpMessage, popUpMessage, setPopUpVisible, popUpVisible }}
    >
      {children}
    </PopUpContext.Provider>
  );
};

const usePopUp = () => {
  const context = useContext(PopUpContext);
  if (!context) {
    throw new Error("usePopUp must be used within a PopUpProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { usePopUp, PopUpProvider };
