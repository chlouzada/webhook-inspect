import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";

const errorHandler = (
  e: CustomError | unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (e instanceof CustomError) return res.status(e.statusCode).send(e);
  return res.status(500).send("internal server error");
};

export default errorHandler;
