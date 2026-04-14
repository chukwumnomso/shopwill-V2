import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState();
  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
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
