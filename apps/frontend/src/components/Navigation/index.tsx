import {
  Divider,
  Navbar,
  Text,
  ScrollArea,
  Select,
  Container,
  ActionIcon,
  Button,
} from "@mantine/core";
import moment from "moment";
import React from "react";
import { IWebhook } from "../../contexts/WebhooksContext";
import { useCollections } from "../../hooks/useCollections";
import { useWebhooks } from "../../hooks/useWebhooks";

export default function Nagivation({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const { webhooks, collection, render: { change } } = useWebhook();
  const { collections, collection, changeCollection, create } = useCollections();
  const { webhooks, changeRenderWebhook } = useWebhooks();

  const handleCopy = () => {
    if (!collection) return;
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_BACKEND_URL}/webhooks/${collection?.name}`
    );
  };

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
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
              value: collection._id,
            })) || []
          }
        />
        <Button onClick={handleCopy}>Copy</Button>
      </Navbar.Section>
      <Navbar.Section className="pt-2">
        <Button className="w-full" onClick={create}>New</Button>
        <Divider my="sm" />
      </Navbar.Section>
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        {webhooks
          ?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          ?.map((webhook) =>
            WebhookNavigationItem({ webhook, changeRenderWebhook })
          )}
      </Navbar.Section>
    </Navbar>
  );
}

function WebhookNavigationItem({
  webhook,
  changeRenderWebhook,
}: {
  webhook: IWebhook;
  changeRenderWebhook: (id: string) => void;
}) {
  const date = moment(webhook.createdAt);
  return (
    <ActionIcon
      key={webhook._id}
      onClick={() => {
        changeRenderWebhook(webhook._id);
      }}
      className="flex w-full items-center mb-2 rounded-md hover:shadow-md px-4 py-6 hover:bg-gray-100 transition-all"
    >
      <HttpMethod method={webhook.data.method} />
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
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
}) {
  switch (method) {
    case "GET":
      return (
        <span className="text-purple-500 rounded-md py-1 px-2 shadow">
          {method}
        </span>
      );
    case "POST":
      return (
        <span className="text-green-500 rounded-md py-1 px-2 shadow">
          {method}
        </span>
      );
    case "PUT":
      return (
        <span className="text-yellow-500 rounded-md py-1 px-2 shadow">
          {method}
        </span>
      );
    case "DELETE":
      return (
        <span className="text-red-500 rounded-md py-1 px-2 shadow">
          {method}
        </span>
      );
    case "PATCH":
      return (
        <span className="text-yellow-600 rounded-md py-1 px-2 shadow">
          {method}
        </span>
      );
    case "HEAD":
      return (
        <span className="text-blue-500 rounded-md py-1 px-2 shadow">
          {method}
        </span>
      );
    case "OPTIONS":
      return (
        <span className="text-indigo-500 rounded-md py-1 px-2 shadow">
          {method}
        </span>
      );
    default:
      return (
        <span className="text-gray-500 rounded-md py-1 px-2 shadow">
          {method}
        </span>
      );
  }
}
