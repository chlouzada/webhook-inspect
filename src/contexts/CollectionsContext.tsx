import moment from "moment";
import { nanoid } from "nanoid";
import React, { ReactNode, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { IWebhook } from "./WebhooksContext";
import { useContext } from "react";
import { createCollection, getCollections } from "@/queries/collection";
import { trpc } from "@/utils/trpc";
import { useUser } from "./UserContext";

export function useCollections() {
  return useContext(CollectionsContext);
}

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

export interface ICollection {
  _id: string;
  name: string;
  publicCollection: boolean;
  webhooksRef: IWebhook[];
  createdAt: string;
  updatedAt: string;
}

export function CollectionsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useUser()
  const [collections, setCollections] = useState<ICollection[]>();
  const [collection, setCollection] = useState<ICollection>();

  // const createCollectionMutation = useMutation(createCollection);
  const collectionsQuery = trpc.useQuery(['collections', { userId: user.id }]);
  const newCollectionMutation = trpc.useMutation(['new-collection']);

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
