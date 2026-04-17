import mongoose from "mongoose";

const signup=async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()
}