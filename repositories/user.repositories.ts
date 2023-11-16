import User from '../model/user.model'

export const userRepository = {
  async getOneUser(email: string) {
    const user = await User.findOne({ email }).select('-_id -__v')
    return user
  },
  async createUser(createUser: {}) {
    const savedUser = await User.create(createUser)
    const { _id, __v, password, ...data } = savedUser.toObject()
    return data
  },
}