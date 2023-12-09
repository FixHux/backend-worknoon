import User from "../model/user.model";
import { FilterQuery, UpdateQuery } from "mongoose";

export const userRepository = {
  async getOneUser(email: string) {
    const user = await User.findOne({ email }).select("-__v ");
    return user;
  },
  async getOneUserData(item: any) {
    const user = await User.findOne(item).select("-__v");
    return user;
  },
  async createUser(createUser: {}) {
    const savedUser = await User.create(createUser);
    const { _id, __v, password, ...data } = savedUser.toObject();
    return data;
  },
  async updateUserData(
    queryParams: FilterQuery<any>,
    fields: UpdateQuery<any>
  ): Promise<any> {
    return User.updateOne(fields, {
      $set: queryParams,
    });
  },
};
