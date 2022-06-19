import { trpc } from "@/utils/trpc";
import { Webhook, WebhookResponse } from "@prisma/client";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useCollections } from "./CollectionsContext";

export function useWebhooks() {
  return useContext(WebhooksContext);
}

export const WebhooksContext = React.createContext({} as WebhooksContextType);

type WebhooksContextType = {
  webhooks: Webhook[];
  render?: {
    webhook: Webhook | undefined;
    response: WebhookResponse | undefined;
    // change: (key: string) => void;
  };
  change: (webhookId: string) => void;
};

export interface IWebhookResponse {
  body: object;
  receivedAt: string;
}

export function WebhooksContextProvider({ children }: { children: ReactNode }) {
  const { collection } = useCollections();
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [render, setRender] = useState<{
    webhook: Webhook | undefined;
    response: WebhookResponse | undefined;
  }>();

  const query = trpc.useQuery(["webhooks", { collectionId: (collection?.id as string) }], {
    enabled: !!collection?.id,
  });

  useEffect(() => {
    if (!query.data) return;
    setWebhooks(query.data);
    setRender({ webhook: query.data[0], response: undefined });
  }, [query.data]);

  const change = (webhookId: string) => {
    const webhook = webhooks?.find((w) => w.id === webhookId);
    setRender({ webhook, response: undefined });
  };

  return (
    <WebhooksContext.Provider
      value={{
        webhooks,
        render,
        change,
      }}
    >
      {children}
    </WebhooksContext.Provider>
  );
}
