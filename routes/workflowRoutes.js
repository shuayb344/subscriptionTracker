import { Route } from "express";
const workflowRouter = Route();
workflowRouter.get("/", (req, res) => {
  res.send({ message: "Workflow route" });
});

export default workflowRouter;