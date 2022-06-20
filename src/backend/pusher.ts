import { Webhook } from "@prisma/client";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1426321",
  key: "1cd4614f4c0a77332cfe",
  secret: "3b7aec8b64478250b1ce",
  cluster: "us2",
  useTLS: true,
});

const emitWebhook = async ({
  collectionId,
  data,
}: {
  collectionId: string;
  data: Webhook;
}) => {
  pusher.trigger(String(collectionId), "webhook", data);
  pusher.trigger(`collection`, "webhook", data);
};

export { emitWebhook };
