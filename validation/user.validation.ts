import Joi from 'joi'

const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]*)(?=.*[!@#$%^&*_-])(?=.{8,})"
);
export const userValidation =  {
    create: Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email(),
      companyName: Joi.string(),
      companyAddress: Joi.string().allow(''),
      password: Joi.string()
        .pattern(passwordRegex)
        .max(70)
        .messages({
          "string.pattern.match": '"password" must be stronger',
          "string.pattern.base":
            'The "password" must meet the specified criteria: at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8 characters.',
        })
        .required(),
      confirm_password: Joi.any()
        .equal(Joi.ref("password"))
        .messages({ "any.only": "{{#label}} does not match" }),
    }).with("password", "confirm_password"),
  
    login: Joi.object({
      firstname: Joi.string(),
      lastname: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string()
        .pattern(passwordRegex)
        .max(70)
        .messages({
          "string.pattern.match": '"password" must be stronger',
          "string.pattern.base":
            'The "password" must meet the specified criteria: at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8 characters.',
        })
        .required(),
    }),
    forgot: Joi.object({
      email: Joi.string().email().required(),
      // password: Joi.string()
      //   .pattern(passwordRegex)
      //   .max(70)
      //   .messages({
      //     "string.pattern.match": '"password" must be stronger',
      //     "string.pattern.base":
      //       'The "password" must meet the specified criteria: at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8 characters.',
      //   })
      //   .required(),
    }),
    reset: Joi.object({
      token: Joi.string().required(),
      password: Joi.string()
        .pattern(passwordRegex)
        .max(70)
        .messages({
          "string.pattern.match": '"password" must be stronger',
          "string.pattern.base":
            'The "password" must meet the specified criteria: at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8 characters.',
        })
        .required(),
    }),
    profile: Joi.object({
      password: Joi.string().optional(),
      email: Joi.string().optional(),
    }),
  };
