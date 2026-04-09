import React from "react";
import { createContext, useState, useContext } from "react";

const PopUpContext = createContext();

const PopUpProvider = ({ children }) => {
  const [popUp, setPopUp] = useState(false);
  const [carted, setCarted] = useState(false);
  const [notUser, setNotUser] = useState(false);
  return (
    <PopUpContext.Provider
      value={{ setPopUp, popUp, carted, setCarted, setNotUser, notUser }}
    >
      {children}
    </PopUpContext.Provider>
  );
};

const usePopUp = () => {
  const context = useContext(PopUpContext);
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { usePopUp, PopUpProvider };
