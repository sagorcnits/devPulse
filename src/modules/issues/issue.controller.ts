import { Request, Response } from "express";
import { sendResponse } from "../../common/sendResponse";
import issueModel from "./issue.model";
import issueService from "./issue.services";
import { TIssue } from "./issue.types";

const issueController = {
  createIssue: async (req: Request, res: Response) => {
    const { title, description, type, reporter_id } = req.body;

    const issue: TIssue = {
      title,
      description,
      type,
      reporter_id,
    };

    try {
      const issues = await issueModel.createIssue(issue as TIssue);
      return sendResponse(res, 200, "Issue created successfully", issues);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getIssues: async (req: Request, res: Response) => {
    try {
      const issues = await issueService.getIssues();
      return sendResponse(res, 200, "Issues fetched successfully", issues);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getIssueById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const issues = await issueService.getIssueById(Number(id));
      return sendResponse(res, 200, "Issue fetched successfully", issues);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateIssue: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existingIssue = await issueService.getIssueById(Number(id));

      if (!existingIssue) {
        return res.status(404).json({
          success: false,
          message: "Issue not found",
        });
      }

      const { title, description, type, reporter_id } = req.body;

      const issue: TIssue = {
        title,
        description,
        type,
        reporter_id,
      };

      const issues = await issueService.updateIssue(
        Number(id),
        issue as TIssue,
      );

      return sendResponse(res, 200, "Issue updated successfully", issues);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteIssue: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existingIssue = await issueService.getIssueById(Number(id));

      if (!existingIssue) {
        return res.status(404).json({
          success: false,
          message: "Issue not found",
        });
      }

      const issues = await issueService.deleteIssue(Number(id));

      return sendResponse(res, 200, "Issue deleted successfully", issues);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default issueController;
