"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const app_1 = __importDefault(require("./app"));
const db_1 = require("./startup/db");
(0, db_1.dbConnection)();
app_1.default.listen(config_1.config.PORT, () => {
    console.log(`Web server is running ${config_1.config.PORT}`);
});
