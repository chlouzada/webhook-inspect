import { Collection, Webhook } from "@prisma/client";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1426321",
  key: "1cd4614f4c0a77332cfe",
  secret: "3b7aec8b64478250b1ce",
  cluster: "us2",
  useTLS: true,
});

const emitWebhook = async ({
  collection,
  webhook,
}: {
  collection: Collection;
  webhook: Webhook;
}) => {
  console.log(await pusher.trigger(collection.name, "new-webhook", webhook));
};

export { emitWebhook };
