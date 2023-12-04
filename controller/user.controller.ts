import { Request, Response } from 'express'
import { userValidation } from '../validation/user.validation'
import { userService } from '../services/user.service'
import { ResponseService } from '../services/response.service'

export const userController = {
  async register(req: Request, res: Response): Promise<{}> {
    const { value, error } = userValidation.create.validate(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })
    const data = await userService.createUser(value)
    return ResponseService.success(
      res,
      'Welcome! You have successfully sign up. Proceed to login',
      data,
    )
  },

  async login(req: Request, res: Response): Promise<{}> {
    const { value, error } = userValidation.login.validate(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })
    const { email } = value
    const { token, refreshToken } = await userService.loginUser(value)
    res.header('authorization', token)
    res.cookie('refreshToken', refreshToken)
    const data = { email, token, refreshToken }
    return ResponseService.success(res, 'Login Successful', data)
  },

  async forgotPassword(req: Request, res: Response): Promise<{}> {
    const { value, error } = userValidation.forgot.validate(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })
    const data = await userService.forgotPassword(value)
    return ResponseService.success(
      res,
      'Email has been sent, kindly follow the instructions',
      data,
    )
  },
  async resetPassword(req: Request, res: Response): Promise<{}> {
    const { value, error } = userValidation.reset.validate(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })
    await userService.resetPassword(value)
    return ResponseService.success(res, 'Password Updated')
  },

  async profile(req: Request, res: Response): Promise<{}> {
    const { value, error } = userValidation.profile.validate(req.body)
    if (error) {
      return res.status(400).send({ error: error.details[0].message })
    }
    value.code = (req.user as { code?: string })?.code
    await userService.updateProfile(value)
    return ResponseService.success(res, 'Profile Updated')
  },
}
