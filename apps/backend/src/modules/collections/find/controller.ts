import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { IJwtPayload } from "../../../middlewares/verifyJwt";
import CustomError from "../../../utils/CustomError";
import FindCollectionsService from "./service";

export default class FindCollectionsController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const filters = request.query;
      const skip = request.query.$skip as string;
      const limit = request.query.$limit as string;
      const { jwt } = response.locals as { jwt: IJwtPayload };
      const service = container.resolve(FindCollectionsService);
      const result = await service.execute({
        userId: jwt.user.id,
        filters,
        skip: parseInt(skip),
        limit: parseInt(limit),
      });
      return response.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomError) return next(error);
      next(CustomError.internalServerError());
    }
  }
}
