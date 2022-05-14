import { onValue, ref, set } from "@firebase/database";
import moment from "moment";
import { nanoid } from "nanoid";
import React, { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

export const WebhookContext = React.createContext({} as WebhookContextType);

interface IWebhookFirebase {
  key: string;
  value: IWebhook;
}

export interface IWebhook {
  createdAt: string;
  metadata: any;
  response?: IWebhook;
}

type WebhookContextType = {
  webhooks: IWebhookFirebase[] | undefined;
};

export function WebhookContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [webhooks, _setWebhooks] = useState<IWebhookFirebase[]>();
  const { user } = useAuth();

  const setWebhooks = (webhooks: IWebhookFirebase[]) => {
    console.log('contexto', webhooks);
    _setWebhooks(webhooks)
  };


  useEffect(() => {
    const collectionId = window.location.pathname.split("/")[1] || nanoid();

    window.history.pushState({}, "", collectionId);

    if (user) {
      const collectionRef = ref(database, `collections/${collectionId}`);

      onValue(collectionRef, (snapshot) => {
        const collection = snapshot.val();
        if (collection) {
          const webhooks = Object.entries(collection.webhooks).map(
            ([key, content]) => {
              const value = content as IWebhook;
              const object: IWebhookFirebase = { key, value: value };
              return object;
            }
          );
          setWebhooks(webhooks);
          // setWebhookRender(webhooks.at(-1)?.value);
          // setWebhookResponseRender(webhooks.at(-1)?.value.response);
        } else {
          set(collectionRef, {
            webhooks: {},
            redirectUrl: "http://3c2a-187-109-255-78.ngrok.io",
            userId: user?.id,
            createdAt: moment().format(),
          });
        }
      });
    }
  }, [user]);

  return (
    <WebhookContext.Provider value={{ webhooks }}>
      {children}
    </WebhookContext.Provider>
  );
}
