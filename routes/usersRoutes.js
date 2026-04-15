import { Router } from "express";
const usersRouter = Router();
usersRouter.get("/", (req, res) => {
  res.send({ message: "Users route" });
});
usersRouter.get("/:id", (req, res) => {
  res.send({ message: `User with id ${req.params.id}` });
});
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