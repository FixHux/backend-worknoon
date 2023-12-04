import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const refreshAuth = (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies('refreshToken')
  if (!refreshToken) {
    return res
      .status(401)
      .send({ message: 'Access denied. No refreshToken provided' });
  }

  try {
    const decoded = jwt.verify(refreshToken, config.REFRESH_JWT);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ message: 'Invalid refreshToken.' });
  }
};