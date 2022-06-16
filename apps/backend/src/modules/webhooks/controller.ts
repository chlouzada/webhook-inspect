import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import CustomError from "../../utils/CustomError";
import CreateWebhooksService from "./service";

export default class CreateWebhooksController {
  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const collectionName = request.params.__collectionName;
      delete request.params.__collectionName;
      const { headers, body, params, query, method } = request;
      const service = container.resolve(CreateWebhooksService);
      const result = await service.execute({
        collectionName,
        headers,
        body,
        params,
        query,
        method,
      });
      return response.status(201).json(result);
    } catch (error) {
      if (error instanceof CustomError) return next(error);
      next(CustomError.internalServerError());
    }
  }
}
