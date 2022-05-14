import Collection from "../../components/Webhook";
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

import { getAuth, signInAnonymously } from "firebase/auth";

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
      <Collection />
    </div>
  );
}
