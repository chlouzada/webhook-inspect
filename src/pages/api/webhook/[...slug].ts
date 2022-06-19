// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/backend/db";

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
      data: {
        headers,
        body,
        query,
        method,
      },
    },
  });

  res.status(200).json(webhook);
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
