import React, { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import readFromCookieOrLocalStorage from "../utils/readFromCookieOrLocalStorage";

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
  const accessToken = readFromCookieOrLocalStorage("accessToken");

  const userQuery = useQuery(
    "user",
    async () => {
      console.log("trying to fecth user");
      const res = await axios.post<{ access_token: string }>("/app/auth/login");
      return res.data;
    },
    { enabled: !accessToken }
  );

  useEffect(() => {
    if (userQuery.data) {
      localStorage.setItem("accessToken", userQuery.data.access_token);
      setUser({
        // id: "userQuery.data.id",
        // username: "userQuery.data.username",
        accessToken: userQuery.data.access_token,
      });
    }
    if (!accessToken) return;

    setUser({
      // id: "userQuery.data.id",
      // username: "userQuery.data.username",
      accessToken,
    });
  }, [userQuery.isFetched]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
