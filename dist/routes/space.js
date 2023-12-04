"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const async_1 = require("../middleware/async");
const space_controller_1 = require("../controller/space.controller");
const router = express_1.default.Router();
router.post('/create', (0, async_1.asyncErrorhandling)(space_controller_1.spaceController.create));
router.get('/', (0, async_1.asyncErrorhandling)(space_controller_1.spaceController.list));
exports.default = router;
