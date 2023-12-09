import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { UserDocument, UserInput } from "../model/user.model";
import { userRepository } from "../repositories/user.repositories";

export const refreshAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res
      .status(401)
      .send({ message: "Access denied. No refreshToken provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, config.REFRESH_JWT);
    req.user = decoded;
    const user = await userRepository.getOneUser(req.user.email);
    const token = user?.generateAuthToken();
    return res.json({ token });
  } catch (ex) {
    res.status(400).send({ message: "Invalid refreshToken." });
  }
};
