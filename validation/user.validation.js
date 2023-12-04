"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]*)(?=.*[!@#$%^&*_-])(?=.{8,})");
exports.userValidation = {
    create: joi_1.default.object({
        firstname: joi_1.default.string(),
        lastname: joi_1.default.string(),
        email: joi_1.default.string().email(),
        companyName: joi_1.default.string().optional(),
        companyAddress: joi_1.default.string().optional(),
        password: joi_1.default.string()
            .pattern(passwordRegex)
            .max(70)
            .messages({
            "string.pattern.match": '"password" must be stronger',
            "string.pattern.base": 'The "password" must meet the specified criteria: at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8 characters.',
        })
            .required(),
        confirm_password: joi_1.default.any()
            .equal(joi_1.default.ref("password"))
            .messages({ "any.only": "{{#label}} does not match" }),
    }).with("password", "confirm_password"),
    login: joi_1.default.object({
        firstname: joi_1.default.string(),
        lastname: joi_1.default.string(),
        email: joi_1.default.string().email(),
        password: joi_1.default.string()
            .pattern(passwordRegex)
            .max(70)
            .messages({
            "string.pattern.match": '"password" must be stronger',
            "string.pattern.base": 'The "password" must meet the specified criteria: at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8 characters.',
        })
            .required(),
    }),
    forgot: joi_1.default.object({
        email: joi_1.default.string().email().required(),
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
    reset: joi_1.default.object({
        token: joi_1.default.string().required(),
        password: joi_1.default.string()
            .pattern(passwordRegex)
            .max(70)
            .messages({
            "string.pattern.match": '"password" must be stronger',
            "string.pattern.base": 'The "password" must meet the specified criteria: at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8 characters.',
        })
            .required(),
    }),
    profile: joi_1.default.object({
        password: joi_1.default.string().optional(),
        email: joi_1.default.string().optional(),
    }),
};
