"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_validation_1 = require("../validation/user.validation");
const user_service_1 = require("../services/user.service");
const response_service_1 = require("../services/response.service");
exports.userController = {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value, error } = user_validation_1.userValidation.create.validate(req.body);
            if (error)
                return res.status(400).send({ error: error.details[0].message });
            const data = yield user_service_1.userService.createUser(value);
            return response_service_1.ResponseService.success(res, 'Welcome! You have successfully sign up. Proceed to login', data);
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value, error } = user_validation_1.userValidation.login.validate(req.body);
            if (error)
                return res.status(400).send({ error: error.details[0].message });
            const { email } = value;
            const { token, refreshToken } = yield user_service_1.userService.loginUser(value);
            res.header('authorization', token);
            res.cookie('refreshToken', refreshToken);
            const data = { email, token, refreshToken };
            return response_service_1.ResponseService.success(res, 'Login Successful', data);
        });
    },
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value, error } = user_validation_1.userValidation.forgot.validate(req.body);
            if (error)
                return res.status(400).send({ error: error.details[0].message });
            const data = yield user_service_1.userService.forgotPassword(value);
            return response_service_1.ResponseService.success(res, 'Email has been sent, kindly follow the instructions', data);
        });
    },
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value, error } = user_validation_1.userValidation.reset.validate(req.body);
            if (error)
                return res.status(400).send({ error: error.details[0].message });
            yield user_service_1.userService.resetPassword(value);
            return response_service_1.ResponseService.success(res, 'Password Updated');
        });
    },
    profile(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { value, error } = user_validation_1.userValidation.profile.validate(req.body);
            if (error) {
                return res.status(400).send({ error: error.details[0].message });
            }
            value.code = (_a = req.user) === null || _a === void 0 ? void 0 : _a.code;
            yield user_service_1.userService.updateProfile(value);
            return response_service_1.ResponseService.success(res, 'Profile Updated');
        });
    },
};
