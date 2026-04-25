import { createContext, useContext, useState, useEffect } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        setIsOpen,
        isOpen,
        filterOpen,
        setFilterOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ModalProvider, useModal };
