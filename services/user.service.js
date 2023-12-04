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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repositories_1 = require("../repositories/user.repositories");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_error_1 = __importDefault(require("../utilis/validation-error"));
const not_found_error_1 = __importDefault(require("../utilis/not-found-error"));
const config_1 = require("../config");
const not_processed_error_1 = __importDefault(require("../utilis/not-processed-error"));
const forgot_password_mail_1 = __importDefault(require("../utilis/forgot-password-mail"));
exports.userService = {
    createUser(createUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repositories_1.userRepository.getOneUser(createUser.email);
            if (user)
                throw new validation_error_1.default('User already registered. Proceed to login');
            const salt = yield bcrypt_1.default.genSalt(10);
            createUser.password = yield bcrypt_1.default.hash(createUser.password, salt);
            const savedUser = yield user_repositories_1.userRepository.createUser(createUser);
            if (!savedUser)
                throw new not_processed_error_1.default('Unsaved User');
            return savedUser;
        });
    },
    loginUser(loginUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repositories_1.userRepository.getOneUser(loginUser.email);
            if (!user)
                throw new validation_error_1.default('Username or Password not found');
            const validPassword = yield bcrypt_1.default.compare(loginUser.password, user.password);
            if (!validPassword)
                throw new validation_error_1.default('Username or Password not found');
            const token = user.generateAuthToken();
            const refreshToken = user.generateRefreshToken();
            return { token, refreshToken };
        });
    },
    forgotPassword(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = value;
            const user = yield user_repositories_1.userRepository.getOneUser(email);
            if (!user) {
                throw new not_found_error_1.default('Email not found');
            }
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.config.FORGOT_PASSWORD, {
                expiresIn: '20m',
            });
            const firstname = user.firstname;
            yield user_repositories_1.userRepository.updateUserData({ emailToken: token }, {
                code: user === null || user === void 0 ? void 0 : user.code,
            });
            yield (0, forgot_password_mail_1.default)(email, firstname, token, 'localhost:8000');
            return email;
        });
    },
    resetPassword(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token: emailToken, password } = value;
            const userNameStored = yield user_repositories_1.userRepository.getOneUserData({ emailToken });
            if (!userNameStored) {
                throw new not_found_error_1.default('Token');
            }
            const updatePassword = {};
            updatePassword.emailToken = '';
            const salt = yield bcrypt_1.default.genSalt(10);
            updatePassword.password = yield bcrypt_1.default.hash(password, salt);
            const { email } = userNameStored;
            const updatedUser = yield user_repositories_1.userRepository.updateUserData(updatePassword, {
                email,
            });
            return updatedUser;
        });
    },
    updateProfile(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code } = value;
            if (value.password) {
                const { password } = value;
                yield user_repositories_1.userRepository.updateUserData({ password }, { code });
            }
            if (value.email) {
                const { email } = value;
                yield user_repositories_1.userRepository.updateUserData({ email }, { code });
            }
            return code;
        });
    },
};
