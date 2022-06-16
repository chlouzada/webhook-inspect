import express from "express";
import verifyJwt from "../middlewares/verifyJwt";
import CreateCollectionsController from "../modules/collections/create/controller";
import FindCollectionsController from "../modules/collections/find/controller";

const collectionsRouter = express();

collectionsRouter.post(
  "/",
  verifyJwt,
  new CreateCollectionsController().handle
);
collectionsRouter.get("/", verifyJwt, new FindCollectionsController().handle);

export default collectionsRouter;
