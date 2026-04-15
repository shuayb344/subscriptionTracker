import { Router } from "express";
const authRouter = Router();

authRouter.post("/signup", (req, res) => {
  res.send({ message: "Signup route" });
});
authRouter.post("/signin", (req, res) => {
  res.send({ message: "Signin route" });
});
authRouter.post("/signout", (req, res) => {
  res.send({ message: "Signout route" });
});

export default authRouter;