"use client";
import AuthContextType from "@/types/context";
import { createContext, ReactNode, useContext, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, isLogged, setIsLogged }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
