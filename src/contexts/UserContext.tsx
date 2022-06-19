import React, { ReactNode, useEffect, useState } from "react";
import { useContext } from "react";
import { trpc } from "@/utils/trpc";
import { User } from "@prisma/client";

export function useUser() {
  return useContext(UserContext);
}

export const UserContext = React.createContext({} as UserContextType);

type UserContextType = {
  user: User;
};

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();

  const newUserMutation = trpc.useMutation(["new-user"]);

  const newUser = async () => {
    const user = await newUserMutation.mutateAsync();
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ls = localStorage.getItem("user");
    const parsed = JSON.parse(ls || "{}");
    setUser((parsed.id && (parsed as User)) || newUser());
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: user!,
      }}
    >
      {user && children}
    </UserContext.Provider>
  );
}
