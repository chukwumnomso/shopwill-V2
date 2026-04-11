import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import supabase from "../components/supabaseClient";
import { getCurrentUser } from "../supabaseAuth/supabaseAuth";
import { synchronizeCart } from "../components/syncToUserCart";

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

  useEffect(() => {
    // 1. Set up the listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        synchronizeCart(session.user.id);
      }
      if (event === "SIGNED_OUT") {
        setUser("");
      }
    });

    // 2. Clean up the listener when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth, AuthProvider };
