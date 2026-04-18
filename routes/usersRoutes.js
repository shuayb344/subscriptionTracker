import { Router } from "express";
import { getAllUsers , getUser} from "../controllers/userController";
import { authorize } from "../middleware/authMiddleware.js";
const usersRouter = Router();
usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", authorize, getUser);
usersRouter.post("/", (req, res) => {
  res.send({ message: "Create user route" });
});
usersRouter.put("/:id", (req, res) => {
  res.send({ message: `Update user with id ${req.params.id}` });
});
usersRouter.delete("/:id", (req, res) => {
  res.send({ message: `Delete user with id ${req.params.id}` });
});

export default usersRouter;