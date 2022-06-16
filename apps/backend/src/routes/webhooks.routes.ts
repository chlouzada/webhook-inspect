import express from "express";
import CreateWebhooksController from "../modules/webhooks/controller";

const webhooksRouter = express();

webhooksRouter.all(
  "/:__collectionName/*",
  new CreateWebhooksController().handle
);

webhooksRouter.all("/:__collectionName", new CreateWebhooksController().handle);

export default webhooksRouter;
