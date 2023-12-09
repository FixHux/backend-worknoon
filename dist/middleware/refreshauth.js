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
exports.refreshAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const user_repositories_1 = require("../repositories/user.repositories");
const refreshAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
    if (!refreshToken) {
        return res
            .status(401)
            .send({ message: "Access denied. No refreshToken provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.config.REFRESH_JWT);
        req.user = decoded;
        const user = yield user_repositories_1.userRepository.getOneUser(req.user.email);
        const token = user === null || user === void 0 ? void 0 : user.generateAuthToken();
        return res.json({ token });
    }
    catch (ex) {
        res.status(400).send({ message: "Invalid refreshToken." });
    }
});
exports.refreshAuth = refreshAuth;
