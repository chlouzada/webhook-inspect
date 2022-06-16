import express from "express";
import AuthController from "../modules/auth/controller";

const authRouter = express();

authRouter.post("/", new AuthController().handle);

export default authRouter;
