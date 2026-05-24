import { Router } from "express";
import issueController from "./issue.controller";

const issueRouter = Router();

issueRouter.post("/", issueController.createIssue);
issueRouter.get("/", issueController.getIssues);
issueRouter.get("/:id", issueController.getIssueById);
issueRouter.patch("/:id", issueController.updateIssue);

export default issueRouter;
