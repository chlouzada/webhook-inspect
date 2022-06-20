import * as trpc from "@trpc/server";
import z from "zod";
import { prisma } from "@/backend/db";

export const webhooks = trpc
  .router()
  .query("all", {
    input: z.object({
      collectionId: z.string().length(24),
    }),
    async resolve({ input }) {
      return await prisma.webhook.findMany({
        where: {
          collectionId: input.collectionId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  })