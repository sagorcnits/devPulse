import { NextFunction, Request, Response } from "express";
import { sendError } from "../common/sendError";

export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
};

export const notFound = (_req: Request, res: Response): void => {
  sendError(res, 404, "Not Found", { message: "Route not found" });
};
