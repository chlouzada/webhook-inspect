import { onValue, ref, set } from "@firebase/database";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { nanoid } from "nanoid";
import JsonArea from "../JsonArea/JsonArea";

export interface IWebhookFirebase {
  key: string;
  value: IWebhook;
}

interface IWebhook {
  createdAt: string;
  metadata: any;
}

export default function Collection() {
  const { user } = useAuth();
  const [collection, setCollection] = useState("");
  const [webhooks, setWebhooks] = useState<IWebhookFirebase[]>([]);
  const [webhookRender, setWebhookRender] = useState<IWebhookFirebase>();
  const [webhookResponseRender, setWebhookResponseRender] =
    useState<IWebhookFirebase>();

  useEffect(() => {
    const collectionId = window.location.pathname.split("/")[1] || nanoid();
    setCollection(collectionId);

    window.history.pushState({}, "", collectionId);

    if (user) {
      const collectionRef = ref(database, `collections/${collectionId}`);

      onValue(collectionRef, (snapshot) => {
        const collection = snapshot.val();
        if (collection) {
          const webhooks = Object.entries(collection.webhooks).map(
            ([key, content]) => {
              console.log(content);
              const value = content as IWebhook;
              const object: IWebhookFirebase = { key, value: value };
              return object;
            }
          );
          setWebhooks(webhooks);
          setWebhookRender(webhooks.at(-1));
          setWebhookResponseRender(webhooks.at(-1));
        } else {
          set(collectionRef, {
            webhooks: {},
            userId: user?.id,
            createdAt: new Date().getTime(),
          });
        }
      });
    }
  }, [user]);

  return (
    <div>
      <h1>Collection Name: {collection}</h1>
      <div className="flex h-full bg-gray-200">
        <div className="w-1/2 p-2">
          <JsonArea webhook={webhookRender} />
        </div>
        <div className="w-1/2 p-2">
          <JsonArea webhook={webhookResponseRender} />
        </div>
      </div>
    </div>
  );
}
