import { Router } from "express";
const subscriptionRouter = Router();
subscriptionRouter.get("/", (req, res) => {
  res.send({ message: "Subscriptions route" });
});
subscriptionRouter.get("/:id", (req, res) => {
  res.send({ message: `Subscription with id ${req.params.id}` });
});
subscriptionRouter.post("/", (req, res) => {
  res.send({ message: "Create subscription route" });
});
subscriptionRouter.put("/:id", (req, res) => {
  res.send({ message: `Update subscription with id ${req.params.id}` });
});
subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ message: `Delete subscription with id ${req.params.id}` });
});
subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({ message: `Subscriptions for user with id ${req.params.id}` });
});
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ message: `Cancel subscription with id ${req.params.id}` });
});
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ message: "Upcoming renewals route" });
});

export default subscriptionRouter;