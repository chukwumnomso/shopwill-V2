import React from "react";
import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [carted, setCarted] = useState(false);
  const [notUser, setNotUser] = useState(false);
  return (
    <ModalContext.Provider
      value={{ setModal, modal, carted, setCarted, setNotUser, notUser }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useModal, ModalProvider };
