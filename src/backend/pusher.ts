import { Collection, Webhook } from "@prisma/client";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1426321",
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
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
