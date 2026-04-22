import { Router } from "express";
import { sendReminders } from "../controllers/workflowControllers.js";
const workflowRouter = Router();
workflowRouter.post("/send-reminders", sendReminders);

export default workflowRouter;