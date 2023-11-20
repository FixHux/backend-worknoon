import { userRepository } from '../repositories/user.repositories'
import bcrypt from 'bcrypt'
import { UserInputRegister, UserInput } from '../interfaces/user'
import ValidationError from '../utilis/validation-error'
import UnprocessableError from '../utilis/not-processed-error'

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
    return {token , refreshToken }
  },
}
