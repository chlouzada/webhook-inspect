import Collection from "../../components/Collection/Collection";
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

import { getAuth, signInAnonymously } from "firebase/auth";
import { nanoid } from "nanoid";
import Header from "../../components/Header/Header";

export default function Main() {
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      if (!user) {
        const auth = getAuth();
        await signInAnonymously(auth);
      }
    })();
  });

  return (
    <div>
      <Header />
      <Collection />
    </div>
  );
}
