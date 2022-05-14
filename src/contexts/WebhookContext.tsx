import { onValue, ref, set } from "@firebase/database";
import moment from "moment";
import { nanoid } from "nanoid";
import React, { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router";
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
  response?: {
    createdAt: string;
    metadata: any;
  };
}

type WebhookContextType = {
  collection: string;
  webhooks: IWebhookFirebase[] | undefined;
  render: {
    webhook: IWebhook | undefined;
    response: IWebhook | undefined;
    change: (key: string) => void;
  }
};

export function WebhookContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [collection, setCollection] = useState<string>('')
  const [webhooks, setWebhooks] = useState<IWebhookFirebase[]>();
  const [webhookToRender, setWebhookToRender] = useState<IWebhook>()
  const [webhookResponseToRender, setWebhookResponseToRender] = useState<{
    createdAt: string;
    metadata: any;
  }>()
  const { user } = useAuth();

  useEffect(() => {
    const pathname = window.location.pathname.split("/")
    const collectionName = pathname[pathname.length - 1] || nanoid()
    setCollection(collectionName);

    if (!user) return;

    const collectionRef = ref(database, `collections/${collectionName}`);
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
        setWebhookToRender(webhooks.at(-1)?.value);
        setWebhookResponseToRender(webhooks.at(-1)?.value.response);
      } else {
        set(collectionRef, {
          webhooks: {},
          redirectUrl: "http://3c2a-187-109-255-78.ngrok.io",
          userId: user?.id,
          createdAt: moment().format(),
        });
      }
    });
  }, [user]);

  const changeWebhookToRender = (key: string) => {
    // find webhook
    const webhook = webhooks?.find((webhook) => webhook.key === key);
    if (!webhook) throw new Error('webhook not found')
    setWebhookToRender(webhook.value)
    setWebhookResponseToRender(webhook.value.response)
  }

  return (
    <WebhookContext.Provider value={{
      collection,
      webhooks,
      render: {
        webhook: webhookToRender,
        response: webhookResponseToRender,
        change: changeWebhookToRender,
      }
    }}>
      {children}
    </WebhookContext.Provider>
  );
}
