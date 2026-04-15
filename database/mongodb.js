import mongoose from "mongoose";
import { DB_URI ,NODE_ENV} from "../config/env.js";
if (!DB_URI) {
  console.error("Error: DB_URI is not defined in environment variables.");
  process.exit(1);
}
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to MongoDB successfully in ${NODE_ENV} environment.`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;