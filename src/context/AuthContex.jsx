import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { getCurrentUser } from "../supabaseAuth/supabaseAuth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const verify = async () => {
      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData);
      }
    };
    verify();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth, AuthProvider };
