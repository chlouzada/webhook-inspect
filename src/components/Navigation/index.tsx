import { useCollections } from "@/contexts/CollectionsContext";
import {
  Divider,
  Navbar,
  ScrollArea,
  Select,
  ActionIcon,
  Button,
} from "@mantine/core";
import { Webhook } from "@prisma/client";
import moment from "moment";
import React from "react";
import { useWebhooks } from "../../contexts/WebhooksContext";

export default function Nagivation({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const { webhooks, collection, render: { change } } = useWebhook();
  const {
    collections,
    collection,
    change: changeCollection,
    create,
  } = useCollections();
  const { webhooks, change: changeWebhook } = useWebhooks();

  const handleCopy = () => {
    if (!collection) return;
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook/${collection.name}`
    );
  };

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section className="pb-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            create({ name: "tesdt" });
          }}
        >
          New
        </Button>
      </Navbar.Section>
      <Navbar.Section className="w-full flex gap-2">
        <Select
          className="w-full"
          placeholder={collection?.name}
          onChange={(collectionId) => {
            if (!collectionId) return;
            changeCollection(collectionId);
          }}
          data={
            collections?.map((collection) => ({
              label: collection.name,
              value: collection.id,
            })) || []
          }
        />
        <Button variant="outline" onClick={handleCopy}>
          Copy
        </Button>
      </Navbar.Section>
      <Navbar.Section>
        <Divider my="sm" />
      </Navbar.Section>
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        {webhooks
          ?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          ?.map((webhook) => WebhookNavigationItem({ webhook, changeWebhook }))}
      </Navbar.Section>
    </Navbar>
  );
}

function WebhookNavigationItem({
  webhook,
  changeWebhook,
}: {
  webhook: Webhook;
  changeWebhook: (id: string) => void;
}) {
  const date = moment(webhook.createdAt);
  return (
    <ActionIcon
      key={webhook.id}
      onClick={() => {
        changeWebhook(webhook.id);
      }}
      className="flex w-full items-center mb-2 rounded-md hover:shadow-md px-4 py-6 hover:bg-gray-100 transition-all"
    >
      <HttpMethod
        method={
          webhook.method as
            | "GET"
            | "POST"
            | "PUT"
            | "DELETE"
            | "PATCH"
            | "HEAD"
            | "OPTIONS"
            | null
        }
      />
      <div className="flex flex-col items-end ml-auto">
        <p>{date.format("HH:mm:ss")}</p>
        <p>{date.format("YYYY-MM-DD")}</p>
      </div>
    </ActionIcon>
  );
}

function HttpMethod({
  method,
}: {
  method:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "HEAD"
    | "OPTIONS"
    | null;
}) {
  const selectColor = (m: string | null) => {
    if (m === "GET") return "text-purple-500";
    if (m === "POST") return "text-green-500";
    if (m === "PUT") return "text-yellow-500";
    if (m === "DELETE") return "text-red-500";
    if (m === "PATCH") return "text-yellow-600";
    if (m === "HEAD") return "text-blue-500";
    if (m === "OPTIONS") return "text-indigo-500";
    return "text-gray-500";
  };

  return (
    <span className={`${selectColor(method)} rounded-md py-1 px-2 shadow`}>
      {method}
    </span>
  );
}
