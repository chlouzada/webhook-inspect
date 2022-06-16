import axios from "axios";
import { nanoid } from "nanoid";
import { ICollection } from "shared";

export const getCollections = async () => {
  const res = await axios.get<ICollection[]>("/collections");
  return res.data;
};

export const createCollection = async ({
  name,
  publicCollection,
}: {
  name?: string;
  publicCollection?: boolean;
}) => {
  const res = await axios.post("/collections", {
    name: name || nanoid(),
    publicCollection: publicCollection || false,
  });
  return res.data;
};
