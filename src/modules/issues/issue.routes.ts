import { Router } from "express";
import authMiddleware from "../../middleware/auth";
import checkRole from "../../middleware/checkRole";
import issueController from "./issue.controller";

const issueRouter = Router();

issueRouter.post("/", authMiddleware, issueController.createIssue);
issueRouter.get(
  "/",
  authMiddleware,
  checkRole(["maintainor"]),
  issueController.getIssues,
);
issueRouter.get("/:id", authMiddleware, issueController.getIssueById);
issueRouter.patch(
  "/:id",
  authMiddleware,
  checkRole(["maintainor"]),
  issueController.updateIssue,
);
issueRouter.delete(
  "/:id",
  authMiddleware,
  checkRole(["maintainor"]),
  issueController.deleteIssue,
);

export default issueRouter;
