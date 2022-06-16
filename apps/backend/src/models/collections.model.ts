import { Schema, model, Document } from "mongoose";
import { nanoid } from "nanoid";
import { ICollection as ICollectionShared } from "shared";

interface ICollection
  extends Omit<
    ICollectionShared,
    "_id" | "userRef" | "webhooksRef" | "createdAt" | "updatedAt"
  > {
  userRef: Schema.Types.ObjectId;
  webhooksRef: Schema.Types.ObjectId;
}

export type Collection = ICollection & Document;

const collectionSchema = new Schema<ICollection>(
  {
    name: { type: String, default: () => nanoid() },
    publicCollection: { type: Boolean, default: false },
    redirectTo: { type: String, required: false },
    userRef: { type: Schema.Types.ObjectId, ref: "users", required: false },
    webhooksRef: [
      { type: Schema.Types.ObjectId, ref: "webhooks", required: false },
    ],
  },
  { timestamps: true }
);

export const CollectionsModel = model<ICollection>(
  "collections",
  collectionSchema
);
