import * as trpc from "@trpc/server";
import z from "zod";
import { prisma } from "@/backend/db";

export const appRouter = trpc
  .router()
  .query("collections", {
    input: z.object({
      userId: z.string().length(24),
    }),
    async resolve({ input }) {
      return await prisma.collection.findMany({
        where: {
          userId: input.userId,
        },
      });
    },
  })
  .mutation("new-collection", {
    input: z.object({ name: z.string(), userId: z.string().length(24) }),
    async resolve({ input }) {
      return await prisma.collection.create({
        data: {
          ...input,
        },
      });
    },
  })
  .mutation("new-user", {
    async resolve() {
      const user =  await prisma.user.create({ data: {} })
      await prisma.collection.create({
        data:{
          name: "Default",
          userId: user.id,
        }
      })
      return user
    },
  });
// export type definition of API
export type AppRouter = typeof appRouter;
