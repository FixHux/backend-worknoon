import express from "express";
import multer from "multer";
import { asyncErrorhandling } from "../middleware/async";
import { userController } from "../controller/user.controller";
import { refreshAuth } from "../middleware/refreshauth";
import { auth } from "../middleware/auth";

import storage from "../utilis/multer";
import { validateUser } from "../middleware/validateUser";
const upload = multer({ storage });

const router = express.Router();
// Register
router.post("/register", asyncErrorhandling(userController.register));
router.post("/verify/user", asyncErrorhandling(userController.verifyToken));
router.post(
  "/update/verification/code",
  asyncErrorhandling(userController.resendVerificationToken)
);
// ...
router.post("/login", asyncErrorhandling(userController.login));

router.post(
  "/reset-password",
  asyncErrorhandling(userController.forgotPassword)
);
router.post(
  "/finish/reset/password",
  asyncErrorhandling(userController.resetPassword)
);
// router.post(
//   "/change-password",
//   asyncErrorhandling(userController.resetPassword)
// );
// ...
router.get("/refresh-token", refreshAuth);
router.get("/validate", auth, validateUser);

router.put(
  "/settings",
  auth,
  upload.single("profileImage"),
  userController.settings
);

export default router;
