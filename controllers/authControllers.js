import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import User from "../models/usersModel.js"
import jwt from "jsonwebtoken"
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js"

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { name, email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      const error = new Error("User already exists")
      error.status = 400
      throw error
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUsers = await User.create([{ name, email, password: hashedPassword }], { session })
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    await session.commitTransaction()
    session.endSession()

    newUsers[0].password = undefined
    res.status(201).json({
      success: true, message: "User created successfully", data: {
        token, user: newUsers[0]
      }
    })
  } catch (error) {
    await session.abortTransaction()
    next(error)
  } finally {
    session.endSession()
  }
}
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      const error = new Error("user not found")
      error.status = 404
      throw error
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      const error = new Error("Invalid password")
      error.status = 401
      throw error
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    user.password = undefined
    res.json({ success: true, message: "Signed in successfully", data: { token, user } })
  } catch (error) {
    next(error)
  }
}
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token")
    res.status(200).json({ success: true, message: "Signed out successfully" })
  } catch (error) {
    next(error)
  }
}

