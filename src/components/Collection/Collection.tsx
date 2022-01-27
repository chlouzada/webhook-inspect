import { onValue, ref, set } from "@firebase/database";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { nanoid } from "nanoid";
import JsonArea from "../JsonArea/JsonArea";
import moment from "moment";

export interface IWebhookFirebase {
  key: string;
  value: IWebhook;
}

export interface IWebhook {
  createdAt: string;
  metadata: any;
  response?: IWebhook;
}

export default function Collection() {
  const { user } = useAuth();
  const [collection, setCollection] = useState("");
  const [webhooks, setWebhooks] = useState<IWebhookFirebase[]>([]);
  const [webhookRender, setWebhookRender] = useState<IWebhook>();
  const [webhookResponseRender, setWebhookResponseRender] =
    useState<IWebhook>();

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
              const value = content as IWebhook;
              const object: IWebhookFirebase = { key, value: value };
              return object;
            }
          );
          setWebhooks(webhooks);
          setWebhookRender(webhooks.at(-1)?.value);
          setWebhookResponseRender(webhooks.at(-1)?.value.response);
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

  const handlerChangeWebhook = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    webhook: IWebhook
  ) => {
    e.preventDefault;
    setWebhookRender(webhook);
  };

  return (
    <div>
      <div className="flex container mx-auto">
        {newFunction(webhooks, handlerChangeWebhook)}
        <section className="">
          <div className="">
            <h1>Collection Name: {collection}</h1>
            <p>Redirect:</p>
          </div>
          <JsonArea webhook={webhookRender} />
        </section>
      </div>
    </div>
  );
}

function newFunction(
  webhooks: IWebhookFirebase[],
  handlerChangeWebhook: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    webhook: IWebhook
  ) => void
) {
  return (
    <nav className=" w-64 px-4 tex-gray-900">
      <ul className="p-2">
        {webhooks.map((webhook, index) => (
          <li
            key={index}
            className="mb-2 p-4 flex flex-row border-gray-300 hover:text-black hover:bg-gray-300 hover:font-bold rounded-lg"
            onClick={(e) => {
              handlerChangeWebhook(e, webhook.value);
            }}
          >
            <button>
              <p className="text-sm">{webhook.key}</p>
              <span>{moment(webhook.value.createdAt).format("HH:mm:ss")}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
