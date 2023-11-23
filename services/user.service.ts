import { userRepository } from '../repositories/user.repositories'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserInputRegister, UserInput } from '../interfaces/user'
import ValidationError from '../utilis/validation-error'
import NotFoundError from '../utilis/not-found-error'
import { config } from '../config'
import UnprocessableError from '../utilis/not-processed-error'
import sendForgetPasswordEmail from '../utilis/forgot-password-mail'

export const userService = {
  async createUser(createUser: UserInputRegister) {
    const user = await userRepository.getOneUser(createUser.email)
    if (user)
      throw new ValidationError('User already registered. Proceed to login')
    const salt = await bcrypt.genSalt(10)
    createUser.password = await bcrypt.hash(createUser.password, salt)
    const savedUser = await userRepository.createUser(createUser)
    if (!savedUser) throw new UnprocessableError('Unsaved User')
    return savedUser
  },

  async loginUser(loginUser: UserInput) {
    const user = await userRepository.getOneUser(loginUser.email)
    if (!user) throw new ValidationError('Username or Password not found')
    const validPassword = await bcrypt.compare(
      loginUser.password,
      user.password,
    )
    if (!validPassword)
      throw new ValidationError('Username or Password not found')
    const token = user.generateAuthToken()
    const refreshToken = user.generateRefreshToken()
    return { token, refreshToken }
  },

  async forgotPassword(value: {
    email: string
    password: string
  }): Promise<any> {
    const { email } = value
    const user = await userRepository.getOneUser(email)
    if (!user) {
      throw new NotFoundError('Email not found')
    }

    const token = jwt.sign({ _id: user._id }, config.FORGOT_PASSWORD, {
      expiresIn: '20m',
    })
    const firstname = user.firstname
    await userRepository.updateUserData(
      { emailToken: token },
      {
        code: user?.code,
      },
    )
    await sendForgetPasswordEmail(email, firstname, token, 'localhost:8000')
    return email
  },
  async resetPassword(value: {
    token: string
    password: string
  }): Promise<any> {
    const { token: emailToken, password } = value

    const userNameStored = await userRepository.getOneUserData({ emailToken })
    if (!userNameStored) {
      throw new NotFoundError('Token')
    }
    const updatePassword: any = {}
    updatePassword.emailToken = ''
    const salt = await bcrypt.genSalt(10)
    updatePassword.password = await bcrypt.hash(password, salt)
    const { email } = userNameStored
    const updatedUser = await userRepository.updateUserData(updatePassword, {
      email,
    })

    return updatedUser
  },
}
