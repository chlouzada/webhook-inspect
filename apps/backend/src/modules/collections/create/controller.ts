import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { IJwtPayload } from "../../../middlewares/verifyJwt";
import CustomError from "../../../utils/CustomError";
import CreateCollectionsService from "./service";

export default class CreateCollectionsController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.body;
      const { jwt } = response.locals as { jwt: IJwtPayload };
      const service = container.resolve(CreateCollectionsService);
      const result = await service.execute({ name, userId: jwt.user.id });
      return response.status(201).json(result);
    } catch (error) {
      if (error instanceof CustomError) return next(error);
      next(CustomError.internalServerError());
    }
  }
}
