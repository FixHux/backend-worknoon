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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_validation_1 = require("../validation/user.validation");
const user_service_1 = require("../services/user.service");
const response_service_1 = require("../services/response.service");
const generateToken_1 = require("../utilis/generateToken");
exports.userController = {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value, error } = user_validation_1.userValidation.create.validate(req.body);
            if (error)
                return res.status(400).send({ error: error.details[0].message });
            value.verificationToken = (0, generateToken_1.generateRandomString)(5);
            value.verificationTokenExp = new Date(Date.now() + 600000); // 10 mins
            const data = yield user_service_1.userService.createUser(value);
            return response_service_1.ResponseService.success(res, "Welcome! You have successfully sign up. Proceed to login", data);
        });
    },
    verifyToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value, error } = user_validation_1.userValidation.verify.validate(req.body);
            if (error)
                return res.status(400).send({ error: error.details[0].message });
            const data = yield user_service_1.userService.verifyToken(value);
            res.header("authorization", data.token);
            res
                .cookie("refreshToken", data.refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: "none",
                secure: true,
                domain: "*.cyclic.app",
            })
                .cookie("refreshToken", data.refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: "lax",
            });
            return response_service_1.ResponseService.success(res, "Congratulations! You have been successfully verified!", data);
        });
    },
    resendVerificationToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value, error } = user_validation_1.userValidation.resendToken.validate(req.body);
            if (error)
                return res.status(400).send({ error: error.details[0].message });
            value.verificationToken = (0, generateToken_1.generateRandomString)(5);
            value.verificationTokenExp = new Date(Date.now() + 600000);
            const data = yield user_service_1.userService.resendVerificationToken(value);
            return response_service_1.ResponseService.success(res, "Congratulations! You have been gotten a email token", data);
        });
    },
    verifyToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value, error } = user_validation_1.userValidation.verify.validate(req.body);
            if (error)
                return res.status(400).send({ error: error.details[0].message });
            const data = yield user_service_1.userService.verifyToken(value);
            return response_service_1.ResponseService.success(res, 'Congratulations! You have been successfully verified!', data);
        });
    },
    resendVerificationToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value, error } = user_validation_1.userValidation.resendToken.validate(req.body);
            if (error)
                return res.status(400).send({ error: error.details[0].message });
            value.verificationToken = (0, generateToken_1.generateRandomString)(5);
            value.verificationTokenExp = new Date(Date.now() + 600000);
            const data = yield user_service_1.userService.resendVerificationToken(value);
            return response_service_1.ResponseService.success(res, 'Congratulations! You have been gotten a email token', data);
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value, error } = user_validation_1.userValidation.login.validate(req.body);
            if (error)
                return res.status(400).send({ error: error.details[0].message });
            const { email } = value;
            const _a = yield user_service_1.userService.loginUser(value), { token, refreshToken } = _a, user = __rest(_a, ["token", "refreshToken"]);
            res.header('authorization', token);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: "none",
                secure: true,
                domain: "*.cyclic.app"
            })
                .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: "lax",
            });
            // res.cookie('refreshToken', refreshToken)
            const data = Object.assign({ email, token }, user);
            return response_service_1.ResponseService.success(res, 'Login Successful', data);
        });
    },
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value, error } = user_validation_1.userValidation.forgot.validate(req.body);
            if (error)
                return res.status(400).send({ error: error.details[0].message });
            const data = yield user_service_1.userService.forgotPassword(value);
            return response_service_1.ResponseService.success(res, "Email has been sent, kindly follow the instructions", data);
        });
    },
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value, error } = user_validation_1.userValidation.reset.validate(req.body);
            if (error)
                return res.status(400).send({ error: error.details[0].message });
            yield user_service_1.userService.resetPassword(value);
            return response_service_1.ResponseService.success(res, "Password Updated");
        });
    },
    settings(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { value, error } = user_validation_1.userValidation.profile.validate(req.body);
            if (error) {
                return res.status(400).send({ error: error.details[0].message });
            }
            value.code = (_a = req.user) === null || _a === void 0 ? void 0 : _a.code;
            yield user_service_1.userService.updateProfile(value);
            return response_service_1.ResponseService.success(res, "Profile Updated");
        });
    },
};
