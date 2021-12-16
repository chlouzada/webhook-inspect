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
              console.log(content);
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
            createdAt: new Date().getTime(),
          });
        }
      });
    }
  }, [user]);

  return (
    <div>
      <div className="flex">
        <nav className="flex flex-col bg-purple-900 w-64 h-screen px-4 tex-gray-900 border border-purple-900">
          <ul className="p-2">
            {webhooks.map((webhook, index) => (
              <li
                key={index}
                className="mb-2 p-4 text-gray-100 flex flex-row border-gray-300 hover:text-black hover:bg-gray-300 hover:font-bold rounded-lg"
              >
                <a href="#">
                  <p className="text-sm">{webhook.key}</p>
                  <span>
                    {moment(webhook.value.createdAt).format("HH:mm:ss")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <section className="w-full bg-gray-400">
          <div className="">
            <h1>Collection Name: {collection}</h1>
            <p>Redirect:</p>
          </div>
          <JsonArea webhook={webhookRender} />
          <div className="flex flex-col bg-gray-200">
            {/* <p className="w-full">{webhookRender?.key}</p> */}
            <div className="flex h-96">
              <div className="w-1/2 p-2">
                {/* <JsonArea webhook={webhookRender} /> */}
              </div>
              <div className="w-1/2 p-2">
                {/* <JsonArea webhook={webhookResponseRender} /> */}
              </div>
            </div>
          </div>
        </section>
        {/* <div className="flex flex-wrap flex-grow">
            <div>
              {webhooks.map((webhook) => (
                <div>
                  <h2>{webhook.key}</h2>
                  <p>{moment(webhook.value.createdAt).format("HH:mm:ss")}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap bg-gray-200">
              <h3 className="w-full">{webhookRender?.key}</h3>
              <div className="w-1/2 p-2">
                <JsonArea webhook={webhookRender} />
              </div>
              <div className="w-1/2 p-2">
                <JsonArea webhook={webhookResponseRender} />
              </div>
            </div>
          </div> */}
      </div>
      <div className="flex flex-col"></div>
    </div>
  );
}
