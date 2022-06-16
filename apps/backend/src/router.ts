import express from "express";

import authRouter from "./routes/auth.routes";
import collectionsRouter from "./routes/collections.routes";
import webhooksRouter from "./routes/webhooks.routes";

const router = express();

router.use("/auth", authRouter);
router.use("/collections", collectionsRouter);
router.use("/webhooks", webhooksRouter);

export default router;
