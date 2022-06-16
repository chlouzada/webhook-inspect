import { Schema, model } from "mongoose";

interface IUser {
  collectionsRef: Schema.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  collectionsRef: [
    { type: Schema.Types.ObjectId, ref: "collections", required: false },
  ],
});

const UsersModel = model<IUser>("users", userSchema);

export default UsersModel;
