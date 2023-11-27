import Joi from 'joi'

const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]*)(?=.*[!@#$%^&*_-])(?=.{8,})"
);
export const userValidation =  {
    create: Joi.object({
      
    })
  };
