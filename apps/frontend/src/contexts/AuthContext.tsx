import React, { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../queries/auth";

export const AuthContext = createContext({} as AuthContextType);

type User = {
  // id: string;
  // username: string;
  accessToken: string;
};

type AuthContextType = {
  user: User | undefined;
};

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  const accessToken = localStorage.getItem(import.meta.env.VITE_LS_PREFIX + "accessToken");

  useEffect(() => {
    if (accessToken && accessToken !== 'undefined') return;
    auth()
      .then((data) => {
        localStorage.setItem(import.meta.env.VITE_LS_PREFIX + "accessToken", data.accessToken);
        setUser({
          accessToken: data.accessToken,
        });
      })
      .catch((e) => {
        console.log(e)
        setUser(undefined);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
