import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/authController.js";
import { authorize } from "../middleware/authMiddleware.js";
const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", authorize, signOut);

export default authRouter;