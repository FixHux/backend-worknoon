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
    const {email, verificationToken, firstName} = createUser
    const user = await userRepository.getOneUser(email)
    if (user)
      throw new ValidationError('User already registered. Proceed to login')
    const salt = await bcrypt.genSalt(10)
    createUser.password = await bcrypt.hash(createUser.password, salt)
    const savedUser = await userRepository.createUser(createUser)
    if (!savedUser) throw new UnprocessableError('Unsaved User')
    await sendVerificationEmail(email, firstName, verificationToken, )
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

  async verifyToken(value: any) {
    const {verificationToken} = value
    const user = await userRepository.getOneUser(verificationToken)
    if (!user) throw new NotFoundError('Token')
    if (user && new Date(user.verificationTokenExp) > new Date()) {
      throw new ValidationError('Token has expires')
    }
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
    const {code} = value;
    if(value.password){
      const {password} = value
      await userRepository.updateUserData({password}, {code})
    }
    if(value.email){
      const {email} = value
      await userRepository.updateUserData({email}, {code})
    }
    return code
  },
}
