import { Schema, model } from "mongoose";
import { nanoid } from "nanoid";

interface ICollection {
  name: string;
  publicCollection: boolean;
  redirectTo?: string;
  userRef: Schema.Types.ObjectId;
  webhooksRef: Schema.Types.ObjectId;
}

const collectionSchema = new Schema<ICollection>({
  name: { type: String, default: () => nanoid() },
  publicCollection: { type: Boolean, default: false },
  redirectTo: { type: String, required: false },
  userRef: { type: Schema.Types.ObjectId, ref: "users", required: false },
  webhooksRef: [
    { type: Schema.Types.ObjectId, ref: "webhooks", required: false },
  ],
});

const CollectionsModel = model<ICollection>("collections", collectionSchema);

export default CollectionsModel;
