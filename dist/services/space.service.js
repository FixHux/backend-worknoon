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
exports.spaceService = void 0;
const space_repositories_1 = require("../repositories/space.repositories");
exports.spaceService = {
    createSpace(createSpace) {
        return __awaiter(this, void 0, void 0, function* () {
            const workspace = yield space_repositories_1.spaceRepository.createSpace(createSpace);
            return workspace;
        });
    },
    listSpace(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const listProducts = yield space_repositories_1.spaceRepository.listSpace(queryParams);
            return listProducts;
        });
    },
};
