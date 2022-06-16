import { Schema, model } from "mongoose";

interface IWebhook {
  collectionRef: Schema.Types.ObjectId;
  data: object;
  response?: {
    receivedAt: Date;
    data: object;
  };
}

const webhookSchema = new Schema<IWebhook>({
  collectionRef: {
    type: Schema.Types.ObjectId,
    ref: "collections",
    required: true,
  },
  data: { type: Object, required: true },
  response: {
    receivedAt: { type: Date, required: false },
    data: { type: Object, required: false },
  },
});

const WebhooksModel = model<IWebhook>("webhooks", webhookSchema);

export default WebhooksModel;
