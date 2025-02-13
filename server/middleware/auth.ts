import jwt from "jsonwebtoken";
import env from "dotenv";
import { Request, Response, NextFunction } from "express";

env.config();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).send({ message: "Token not provided" });
    return;
  }
  const jwtToken = token.split(" ")[1];

  if (!jwtToken) {
    res.status(401).send({ message: "Invalid token format" });
    return;
  }
  jwt.verify(
    jwtToken,
    process.env.SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        res.status(401).send({ message: err.message });
        return;
      } else {
        res.locals.userId = decoded.id;
        next();
      }
    }
  );
};
