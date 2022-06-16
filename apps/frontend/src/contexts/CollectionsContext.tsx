import React, { ReactNode, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  createCollection,
  getCollections,
} from "../queries/collections/collection";
import { IWebhook } from "./WebhooksContext";
import { ICollection } from "shared";
import { useModals } from "@mantine/modals";
import { Button, Text, TextInput } from "@mantine/core";

export const CollectionsContext = React.createContext(
  {} as CollectionsContextType
);

type CollectionsContextType = {
  collections: ICollection[] | undefined;
  collection: ICollection | undefined;
  changeCollection: (collectionId: string) => void;
  create: () => void;
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
  const modals = useModals();
  const [collections, setCollections] = useState<ICollection[]>();
  const [collection, setCollection] = useState<ICollection>();

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

  const create = () => {
    const id = modals.openConfirmModal({
      title: "New collection",
      centered: true,
      children: (
        <>
          <TextInput
            onChange={(event) => {
              localStorage.setItem(
                import.meta.env.VITE_LS_PREFIX + "collectionName",
                event.currentTarget.value
              );
            }}
            placeholder="Collection Name"
            data-autofocus
          />
        </>
      ),
      labels: { confirm: "Create", cancel: "Cancel" },
      groupProps: { className: "flex flex-nowrap" },
      confirmProps: { className: "w-full  " },
      cancelProps: { className: "w-full" },
      onConfirm: () => () => {
        modals.closeModal(id);
        createCollectionMutation.mutate({
          name:
            localStorage.getItem(
              import.meta.env.VITE_LS_PREFIX + "collectionName"
            ) || undefined,
        });
      },
    });
  };

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        collection,
        changeCollection,
        create,
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
