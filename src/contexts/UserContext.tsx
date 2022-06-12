import React, { ReactNode, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { IWebhook } from "./WebhooksContext";
import { useContext } from "react";
import { trpc } from "@/utils/trpc";
import { useCookies } from 'react-cookie';

export function useUser() {
  return useContext(UserContext);
}

export const UserContext = React.createContext(
  {} as UserContextType
);

type UserContextType = {
  user: IUser | undefined;
};

export interface IUser {
  id: string;
  createdAt: Date;
}

export function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<IUser>();
  const [cookie, setCookie] = useCookies(['user'])

  const newUserMutation = trpc.useMutation(['new-user'])

  const newUser = async () => {
    const user = await newUserMutation.mutateAsync()
    setUser(user)
    setCookie('user', user)
  }

  useEffect(() => {
    if (!cookie.user) newUser()
  }, [])

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
