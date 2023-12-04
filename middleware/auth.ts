import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('authorization')
  if (!token) {
    return res
      .status(401)
      .send({ message: 'Access denied. No token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], config.JWT);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ message: 'Invalid token.' });
  }
};