import mongoose, { Schema, Document } from 'mongoose'
import jwt from 'jsonwebtoken'
import { config } from '../config'

export interface UserInput {
  firstname: string
  lastname: string
  email: string
  password: string
}

export interface UserDocument extends UserInput, Document {
  code: string
  firstname: string
  lastname: string
  email: string
  password: string
  isAdmin: boolean
  generateAuthToken(): string
  generateRefreshToken(): string
}

const UserSchema: Schema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyAddress: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailToken: {
      type: String,
      required: false,
      default: '',
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
)

UserSchema.methods.generateAuthToken = function generateToken() {
  const user = this as UserDocument
  const expiresIn = 60 * 15 // 15 minutes in seconds

  const payload = {
    _id: user._id,
    firstname: user.firstname,
    code: user.code,
    email: user.email,
    isAdmin: user.isAdmin,
    exp: Math.floor(Date.now() / 1000) + expiresIn,
  }

  const token = jwt.sign(payload, config.JWT as jwt.Secret)
  return token
}

UserSchema.methods.generateRefreshToken = function generatedToken() {
  const user = this as UserDocument
  const expiresIn = 60 * 60 * 24 * 7

  const token = jwt.sign(
    {
      _id: user._id,
      firstname: user.firstname,
      email: user.email,
      isAdmin: user.isAdmin,
      exp: Math.floor(Date.now() / 1000) + expiresIn,
    },
    config.REFRESH_JWT as jwt.Secret,
  )

  return token
}

export default mongoose.model<UserDocument>('User', UserSchema)
