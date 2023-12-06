import { userRepository } from '../repositories/user.repositories'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserInputRegister, UserInput } from '../interfaces/user'
import ValidationError from '../utilis/validation-error'
import NotFoundError from '../utilis/not-found-error'
import { config } from '../config'
import UnprocessableError from '../utilis/not-processed-error'
import sendForgetPasswordEmail from '../utilis/forgot-password-mail'
import sendVerificationEmail from '../utilis/register-mail'

export const userService = {
  async createUser(createUser: UserInputRegister) {
    const { email, verificationToken, firstName } = createUser
    const user = await userRepository.getOneUser(email)
    if (user)
      throw new ValidationError('User already registered. Proceed to login')
    const salt = await bcrypt.genSalt(10)
    createUser.password = await bcrypt.hash(createUser.password, salt)
    const savedUser = await userRepository.createUser(createUser)
    if (!savedUser) throw new UnprocessableError('Unsaved User')
    await sendVerificationEmail(email, firstName, verificationToken)
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
    return { token, refreshToken, user }
  },

  async verifyToken(value: any) {
    const { verificationToken } = value

    const user = await userRepository.getOneUserData({ verificationToken })
    if (!user) throw new NotFoundError('Token')
    const { email } = user

    const expirationTime = new Date(user.verificationTokenExp)
    const currentDateTime = new Date()
    const twentyMinutesAgo = new Date(
      currentDateTime.getTime() - 20 * 60 * 1000,
    ) // 20 minutes in milliseconds

    if (expirationTime < twentyMinutesAgo) {
      throw new ValidationError('Token has expired')
    }

    await userRepository.updateUserData(
      { verificationToken: '', verificationTokenExp: '' },
      {
        email,
      },
    )
    const token = user.generateAuthToken()
    const refreshToken = user.generateRefreshToken()
    return { token, refreshToken }
  },

  async resendVerificationToken(value: any) {
    const { verificationToken: VT, email, verificationTokenExp: VE } = value

    const user = await userRepository.getOneUserData({ email })
    if (!user) throw new NotFoundError('Email')
    const { firstName } = user

    await sendVerificationEmail(email, firstName, VT)
    await userRepository.updateUserData(
      { verificationToken: VT, verificationTokenExp: VE },
      {
        email,
      },
    )
    return user
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
    const firstname = user.firstName
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

  async updateProfile(value: any): Promise<any> {
    const { code } = value
    if (value.password) {
      const { password } = value
      await userRepository.updateUserData({ password }, { code })
    }
    if (value.email) {
      const { email } = value
      await userRepository.updateUserData({ email }, { code })
    }
    return code
  },
}
