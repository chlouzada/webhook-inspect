import React, { ReactNode, useEffect, useState } from "react";
import { useCollections } from "../hooks";

export const WebhooksContext = React.createContext({} as WebhooksContextType);

type WebhooksContextType = {
  webhooks?: IWebhook[];
  render?: {
    webhook: IWebhook | undefined;
    response: IWebhookResponse | undefined;
    // change: (key: string) => void;
  };
  changeRenderWebhook: (id: string) => void;
};

export interface IWebhook {
  _id: string;
  collectionRef: string;
  createdAt: string;
  updatedAt: string;
  data: {
    body?: object;
    headers?: object;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
    params?: object; // TODO: type
  };
  response?: IWebhookResponse;
}

export interface IWebhookResponse {
  body: object;
  receivedAt: string;
}

export function WebhooksContextProvider({ children }: { children: ReactNode }) {
  const { collection } = useCollections();
  const [webhooks, setWebhooks] = useState<any[] | undefined>();
  const [render, setRender] = useState<
    { webhook: any | undefined; response: any | undefined } | undefined
  >();

  useEffect(() => {
    if (!collection) return;
    setWebhooks(collection.webhooksRef);
    setRender({ webhook: collection.webhooksRef[0], response: undefined });
  }, [collection]);

  const changeRenderWebhook = (id: string) => {
    const webhook = webhooks?.find((w) => w._id === id);
    const response = webhook?.response;
    setRender({ webhook, response });
  };

  return (
    <WebhooksContext.Provider
      value={{
        webhooks,
        render,
        changeRenderWebhook,
      }}
    >
      {children}
    </WebhooksContext.Provider>
  );
}
