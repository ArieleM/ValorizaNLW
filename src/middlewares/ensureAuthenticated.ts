import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");
  try {
    const { sub } = verify(
      token,
      "06cb845509bd2da27c2e3c461a4cceb6"
    ) as IPayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
