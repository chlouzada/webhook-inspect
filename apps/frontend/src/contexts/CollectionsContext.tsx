import React, { ReactNode, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { createCollection, getCollections } from "../queries/collections/collection";
import { IWebhook } from "./WebhooksContext";
import { ICollection } from "shared";

export const CollectionsContext = React.createContext(
  {} as CollectionsContextType
);

type CollectionsContextType = {
  collections: ICollection[] | undefined;
  collection: ICollection | undefined;
  changeCollection: (collectionId: string) => void;
  // collection: string;
  // webhooks: any[] | undefined;
  // render: {
  //   webhook: any | undefined;
  //   response: any | undefined;
  //   change: (key: string) => void;
  // };
};

export function CollectionsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [collections, setCollections] = useState<ICollection[]>();
  const [collection, setCollection] = useState<ICollection>();
  // const [webhooks, setWebhooks] = useState<any[]>();
  // const [webhookToRender, setWebhookToRender] = useState<any>();
  // const [webhookResponseToRender, setWebhookResponseToRender] = useState<any>();

  const createCollectionMutation = useMutation(createCollection);

  const collectionsQuery = useQuery("collections", getCollections);

  useEffect(() => {
    if (collectionsQuery.data?.length === 0)
      createCollectionMutation.mutate({});
    setCollections(collectionsQuery.data);
    setCollection(collectionsQuery.data?.[0]);
  }, [collectionsQuery.data]);

  const changeCollection = (collectionId: string) => {
    setCollection(collections?.find((c) => c._id === collectionId));
  };

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        collection,
        changeCollection,
        // webhooks,
        // render: {
        // webhook: webhookToRender,
        // response: webhookResponseToRender,
        // change: changeWebhookToRender,
        // },
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
}