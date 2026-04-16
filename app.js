import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import usersRouter from "./routes/usersRoutes.js";
import authRouter from "./routes/authRoutes.js";
import subscriptionRouter from "./routes/subscriptionRoutes.js";
import connectDB from "./database/mongodb.js";
import errorMiddleware from "./models/middleware/errorMiddlware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/subscriptions", subscriptionRouter);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the Subscription Tracker API" });
});

app.listen(PORT, async () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  await connectDB();
});