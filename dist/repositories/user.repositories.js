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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
exports.userRepository = {
    getOneUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email }).select("-__v ");
            return user;
        });
    },
    getOneUserData(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne(item).select("-__v");
            return user;
        });
    },
    createUser(createUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedUser = yield user_model_1.default.create(createUser);
            const _a = savedUser.toObject(), { _id, __v, password } = _a, data = __rest(_a, ["_id", "__v", "password"]);
            return data;
        });
    },
    updateUserData(queryParams, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.default.updateOne(fields, {
                $set: queryParams,
            });
        });
    },
};
