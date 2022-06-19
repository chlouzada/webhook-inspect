import React, { ReactNode, useEffect, useState } from "react";
import { useContext } from "react";
import { trpc } from "@/utils/trpc";
import { useUser } from "./UserContext";
import { Collection } from "@prisma/client";
import { useModals } from "@mantine/modals";
import { Button, Group, TextInput } from "@mantine/core";

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
  create: (data: { name: string }) => void;
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
  const modals = useModals();

  const query = trpc.useQuery(["collections", { userId: user.id }]);
  const createMutation = trpc.useMutation(["new-collection"]);

  const change = (collectionId: string) => {
    setCollection(collections?.find((c) => c.id === collectionId));
  };

  const create = () => {
    const stringLocalStorage = "new-collection";

    const handleConfirm = async () => {
      const data = localStorage.getItem(stringLocalStorage);
      const parsed = JSON.parse(data || "{}");
      if (!parsed.name) throw Error("invalid create collection data");
      modals.closeModal("new-collection-modal");
      const created = await createMutation.mutateAsync({
        ...parsed,
        userId: user.id,
      });
      setCollection(collections?.find((c) => c.id === created.id));
    };

    const setData = ({ name = "Default" }: { name: string }) => {
      localStorage.setItem(stringLocalStorage, JSON.stringify({ name }));
    };

    modals.openModal({
      id: "new-collection-modal",
      title: "New Collection",
      centered: true,
      children: (
        <Group direction="column" noWrap>
          <TextInput
            className="w-full"
            onChange={(event) => setData({ name: event.target.value })}
            placeholder="Collection Name"
            data-autofocus
          />
          <Group direction="row" noWrap className="w-full mb-3">
            <Button
              className="w-full"
              variant="light"
              onClick={() => modals.closeModal("new-collection-modal")}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={handleConfirm}
              className="w-full"
            >
              Create
            </Button>
          </Group>
        </Group>
      ),
    });
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
