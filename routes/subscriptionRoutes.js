import { Router } from "express";
import { createSubscription, getSubscription, updateSubscription, deleteSubscription, cancelSubscription, getUpcomingRenewals } from "../controllers/subscriptionController.js";
import { authorize } from "../middleware/authMiddleware.js";
const subscriptionRouter = Router();
subscriptionRouter.get("/", (req, res) => {
  res.send({ message: "Subscriptions route" });
});
subscriptionRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);
subscriptionRouter.get("/:id", authorize, getSubscription);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", authorize, updateSubscription);
subscriptionRouter.delete("/:id", authorize, deleteSubscription);
subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription);

export default subscriptionRouter;