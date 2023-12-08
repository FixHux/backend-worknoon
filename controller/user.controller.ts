import { Request, Response } from "express";
import { userValidation } from "../validation/user.validation";
import { userService } from "../services/user.service";
import { ResponseService } from "../services/response.service";
import { generateRandomString } from "../utilis/generateToken";

export const userController = {
  async register(req: Request, res: Response): Promise<{}> {
    const { value, error } = userValidation.create.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    value.verificationToken = generateRandomString(5);
    value.verificationTokenExp = new Date(Date.now() + 600000); // 10 mins
    const data = await userService.createUser(value);
    return ResponseService.success(
      res,
      "Welcome! You have successfully sign up. Proceed to login",
      data
    );
  },

  async verifyToken(req: Request, res: Response): Promise<{}> {
    const { value, error } = userValidation.verify.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const data = await userService.verifyToken(value);
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
    return ResponseService.success(
      res,
      "Congratulations! You have been successfully verified!",
      data
    );
  },

  async resendVerificationToken(req: Request, res: Response): Promise<{}> {
    const { value, error } = userValidation.resendToken.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    value.verificationToken = generateRandomString(5);
    value.verificationTokenExp = new Date(Date.now() + 600000);
    const data = await userService.resendVerificationToken(value);

    return ResponseService.success(
      res,
      "Congratulations! You have been gotten a email token",
      data
    );
  },

  async login(req: Request, res: Response): Promise<{}> {
    const { value, error } = userValidation.login.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const { email } = value;
    const { token, refreshToken, ...user } = await userService.loginUser(value);
    res.header("authorization", token);
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
        domain: "*.cyclic.app",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
      });
    // res.cookie('refreshToken', refreshToken)
    const data = { email, token, ...user };
    return ResponseService.success(res, "Login Successful", data);
  },

  async forgotPassword(req: Request, res: Response): Promise<{}> {
    const { value, error } = userValidation.forgot.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    const data = await userService.forgotPassword(value);
    return ResponseService.success(
      res,
      "Email has been sent, kindly follow the instructions",
      data
    );
  },
  async resetPassword(req: Request, res: Response): Promise<{}> {
    const { value, error } = userValidation.reset.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    await userService.resetPassword(value);
    return ResponseService.success(res, "Password Updated");
  },

  async settings(req: Request, res: Response): Promise<{}> {
    const { value, error } = userValidation.profile.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    value.code = (req.user as { code?: string })?.code;
    await userService.updateProfile(value);
    return ResponseService.success(res, "Profile Updated");
  },
};
