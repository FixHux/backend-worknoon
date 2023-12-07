"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const async_1 = require("../middleware/async");
const user_controller_1 = require("../controller/user.controller");
const refreshauth_1 = require("../middleware/refreshauth");
const auth_1 = require("../middleware/auth");
const multer_2 = __importDefault(require("../utilis/multer"));
const validateUser_1 = require("../middleware/validateUser");
const upload = (0, multer_1.default)({ storage: multer_2.default });
const router = express_1.default.Router();
// Register
router.post('/register', (0, async_1.asyncErrorhandling)(user_controller_1.userController.register));
router.post('/verify/user', (0, async_1.asyncErrorhandling)(user_controller_1.userController.verifyToken));
router.post('/update/verification/code', (0, async_1.asyncErrorhandling)(user_controller_1.userController.resendVerificationToken));
// ...
router.post('/login', (0, async_1.asyncErrorhandling)(user_controller_1.userController.login));
router.post('/reset-password', (0, async_1.asyncErrorhandling)(user_controller_1.userController.forgotPassword));
router.post('finish/reset/password', (0, async_1.asyncErrorhandling)(user_controller_1.userController.resetPassword));
// ...
router.get('/refresh-token', refreshauth_1.refreshAuth);
router.get('/validate', auth_1.auth, validateUser_1.validateUser);
router.put('/settings', auth_1.auth, upload.single('profileImage'), user_controller_1.userController.settings);
exports.default = router;
