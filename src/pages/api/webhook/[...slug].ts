// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/backend/db";
import axios from "axios";
import Pusher from "pusher";
import { emitWebhook } from "@/backend/pusher";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collectionName = req.query.slug[0];
  const { headers, body, query, method } = req;
  const collection = await findOrCreate(collectionName);

  const webhook = await prisma.webhook.create({
    data: {
      collectionId: collection.id,
      headers: JSON.stringify(headers),
      body: JSON.stringify(body),
      query: JSON.stringify(query),
      method: method!,
    },
  });

  await emitWebhook({collection, webhook });

  if (!collection.redirectTo) return res.status(200).json(webhook);

  const response = await axios({
    method: req.method,
    headers: {
      "Content-Type": "application/json",
    },
    url: collection.redirectTo,
    data: webhook,
  });

  await prisma.webhookResponse.create({
    data: {
      webhookId: webhook.id,
      data: response.data,
      contentType: response.headers["content-type"],
      statusCode: response.status,
    },
  });

  res.status(response.status).json(response.data);
}

const findOrCreate = async (name: string) => {
  return (
    (await prisma.collection.findFirst({
      where: { name },
    })) ||
    (await prisma.collection.create({
      data: { name },
    }))
  );
};
