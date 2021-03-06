import * as trpc from "@trpc/server";
import z from "zod";
import { prisma } from "@/backend/db";

export const collections = trpc
  .router()
  .query("all", {
    input: z.object({
      userId: z.string().length(24),
    }),
    async resolve({ input }) {
      const collections = await prisma.collection.findMany({
        where: {
          userId: input.userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (collections.length) return collections;

      return [
        await prisma.collection.create({
          data: {
            name: "default",
            userId: input.userId,
          },
        }),
      ];
    },
  })
  .mutation("new", {
    input: z.object({ name: z.string(), userId: z.string().length(24) }),
    async resolve({ input }) {
      const collection = await prisma.collection.findFirst({
        where: {
          name: input.name,
          userId: undefined,
        },
      });

      if (!collection) {
        return await prisma.collection.create({
          data: {
            name: input.name,
            userId: input.userId,
          },
        });
      }

      // take ownership
      return await prisma.collection.update({
        where: { id: collection.id },
        data: { userId: input.userId },
      });
    },
  });
