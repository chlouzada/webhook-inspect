import React, { createContext, ReactNode, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext({} as AuthContextType);

type User = {
  id: string;
  name: string;
};

type AuthContextType = {
  user: User | undefined;
};

type AuthContextProviderParams = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderParams) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName } = user;

        setUser({
          id: uid,
          name: displayName || "Anônimo",
        });
      }
    });

    return () => {
      unsub();
    };
  }, []);

  // async function signInWithGoogle() {
  //   const provider = new firebase.auth.GoogleAuthProvider();

  //   const result = await auth.signInWithPopup(provider);

  //   if (result.user) {
  //     const { displayName, photoURL, uid } = result.user;

  //     if (!displayName || !photoURL)
  //       throw new Error("Faltando informações essenciais");

  //     setUser({
  //       id: uid,
  //       name: displayName,
  //       avatar: photoURL,
  //     });
  //   }
  // }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
