import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { userRepository } from '../repositories/user.repositories';

export const validateUser = async (req: any, res: Response, next: NextFunction) => {
  const email : string = req.user?.email

  const userData : any= await userRepository.getOneUserData({email})
  const {password, ...user} = userData.toObject()
  if (!email) {
    return res
      .status(401)
      .send({ message: 'User Credentials not Valid' });
  }

  try {
    res.status(200).send({message: "User validated!", user});
  } catch (ex) {
    res.status(500).send({ message: 'Invalid Credentials' });
    next(ex);
  }
};
