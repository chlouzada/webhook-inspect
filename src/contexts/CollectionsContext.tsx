import React, { ReactNode, useEffect, useState } from "react";
import { useContext } from "react";
import { trpc } from "@/utils/trpc";
import { useUser } from "./UserContext";
import { Collection } from "@prisma/client";

export function useCollections() {
  return useContext(CollectionsContext);
}

export const CollectionsContext = React.createContext(
  {} as CollectionsContextType
);

type CollectionsContextType = {
  collections: Collection[] | undefined;
  collection: Collection | undefined;
  change: (collectionId: string) => void;
  create: (data: {name: string}) => void;
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
  const [collections, setCollections] = useState<Collection[]>();
  const [collection, setCollection] = useState<Collection>();

  const { user } = useUser();

  const query = trpc.useQuery(["collections", { userId: user.id }]);
  const createMutation = trpc.useMutation(["new-collection"]);

  const change = (collectionId: string) => {
    setCollection(collections?.find((c) => c.id === collectionId));
  };

  const create = async (data: { name: string }) => {
    const created = await createMutation.mutateAsync({ ...data, userId: user.id });
    setCollection(collections?.find((c) => c.id === created.id));
  };

  useEffect(() => {
    const data = query.data;
    if (!data) return;
    setCollections(data);
    setCollection(data[0]);
  }, [query.data]);

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        collection,
        change,
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
