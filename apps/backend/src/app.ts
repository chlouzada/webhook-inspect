// import * as dotenv from 'dotenv';
import express, { json, urlencoded } from "express";
import { connect } from "mongoose";
import config from "config";
import errorHandler from "./middlewares/errorHandler";
import router from "./router";

const app = express();
connect(config.get("mongo.uri"));
app.use(json({ limit: "10mb" }));
app.use(urlencoded({ extended: true, limit: "10mb" }));
app.use(router);
app.use(errorHandler);

export default app;
