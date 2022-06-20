import * as trpc from "@trpc/server";
import { collections } from "./routes/collections";
import { users } from "./routes/users";
import { webhooks } from "./routes/webhooks";

export const appRouter = trpc
  .router()
  .merge("collections.", collections)
  .merge("users.", users)
  .merge("webhooks.", webhooks);

// export type definition of API
export type AppRouter = typeof appRouter;
  