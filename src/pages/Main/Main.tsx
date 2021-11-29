import Collection from "../../components/Collection/Collection";
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

import { getAuth, signInAnonymously } from "firebase/auth";
import { nanoid } from "nanoid";

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
    <div className="h-screen">
      <Collection />
    </div>
  );
}
