import React, { ReactNode, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { IWebhook } from "./WebhooksContext";
import { useContext } from "react";
import { trpc } from "@/utils/trpc";
import { useCookies } from "react-cookie";
import { join } from "path";

export function useUser() {
  return useContext(UserContext);
}

export const UserContext = React.createContext({} as UserContextType);

type UserContextType = {
  user: IUser | undefined;
};

export interface IUser {
  id: string;
  createdAt: Date;
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser>();

  const newUserMutation = trpc.useMutation(["new-user"]);

  const newUser = async () => {
    const user = await newUserMutation.mutateAsync();
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  useEffect(() => {
    console.log("useff");
    if (typeof window === "undefined") return;
    const ls = localStorage.getItem("user");
    const parsed = JSON.parse(ls || "{}");
    if (!parsed.id) {
      console.log("dentro");
      newUser();
      return;
    }
    console.log("set", parsed);

    setUser(parsed as IUser);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
