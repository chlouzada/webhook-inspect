import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import config from "config";

export interface IJwtPayload extends JwtPayload {
  user: {
    id: string;
  };
}

export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization)
    return res.status(401).json({ error: "no authorization token" });

  if (!authorization.startsWith("Bearer "))
    return res.status(401).json({ error: "invalid authorization token" });

  try {
    const [, token] = authorization.split(" ");

    const decoded = verify(token, config.get("jwt.secret")) as IJwtPayload;

    res.locals = { ...res.locals, jwt: { ...decoded } };

    return next();
  } catch (err) {
    return res.status(401).json({ error: "unauthorized" });
  }
};
