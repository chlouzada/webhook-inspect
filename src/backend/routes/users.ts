import * as trpc from "@trpc/server";
import z from "zod";
import { prisma } from "@/backend/db";

export const users = trpc
  .router()
  .mutation("new", {
    async resolve() {
      const user = await prisma.user.create({ data: {} });
      await prisma.collection.create({
        data: {
          name: "Default",
          userId: user.id,
        },
      });
      return user;
    },
  });
