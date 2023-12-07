import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { userRepository } from '../repositories/user.repositories';

export const validateUser = async (req: any, res: Response, next: NextFunction) => {
  const user = req.user

  if (!user) {
    return res
      .status(401)
      .send({ message: 'User Credentials not Valid' });
  }

  try {
    const foundUser = await userRepository.getOneUser(user.email)

    res.status(200).json({message: "User validated!", data: foundUser});
  } catch (ex) {
    res.status(500).send({ message: 'Invalid Credentials' });
    next(ex);
  }
};
