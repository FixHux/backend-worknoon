import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const validateUser = (req: any, res: Response, next: NextFunction) => {
  const user = req.user?._id
  if (!user) {
    return res
      .status(401)
      .send({ message: 'User Credentials not Valid' });
  }

  try {
    res.status(200).json("User validated!");
  } catch (ex) {
    res.status(500).send({ message: 'Invalid Credentials' });
    next(ex);
  }
};
