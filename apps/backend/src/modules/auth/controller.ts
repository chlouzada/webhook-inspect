import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import CustomError from "../../utils/CustomError";
import AuthService from "./service";

export default class AuthController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      console.log("query é ", request.query);
      const service = container.resolve(AuthService);
      const result = await service.execute();
      console.log("apos o result");
      return response.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) return next(error);
      next(CustomError.internalServerError());
    }
  }
}
