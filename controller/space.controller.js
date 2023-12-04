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
exports.spaceController = void 0;
const space_validation_1 = require("../validation/space.validation");
const space_service_1 = require("../services/space.service");
const response_service_1 = require("../services/response.service");
exports.spaceController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { value, error } = space_validation_1.spaceValidation.create.validate(req.body);
            if (error)
                return res.status(400).send({ error: error.details[0].message });
            value.userId = user;
            const data = yield space_service_1.spaceService.createSpace(value);
            return response_service_1.ResponseService.success(res, 'The WorkSpace is Created, Kindly, wait approval', data);
        });
    },
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = Object.assign({}, req.query);
            const data = yield space_service_1.spaceService.listSpace(queryParams);
            return response_service_1.ResponseService.success(res, 'Work Spaces Successfully Retrieved', data);
        });
    },
};
