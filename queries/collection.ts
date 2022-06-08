import { nanoid } from "nanoid";

export const getCollections = async () => {
  const res = await fetch("/collection", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const createCollection = async ({
  name,
  publicCollection,
}: {
  name?: string;
  publicCollection?: boolean;
}) => {
  const res = await fetch("/collection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name || nanoid(),
      publicCollection: publicCollection || false,
    }),
  });
  return res.json();
};
