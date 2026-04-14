import { createContext, useContext, useState, useEffect } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    console.log(modalOpen);
    console.log(isOpen);
  }, [modalOpen, isOpen]);
  return (
    <ModalContext.Provider
      value={{ modalOpen, setModalOpen, setIsOpen, isOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModal must be used within a NavBarProvider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ModalProvider, useModal };
