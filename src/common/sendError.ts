import { Response } from "express";

export const sendError = <T>(
  res: Response,
  status: number,
  message: string,
  error: T,
) => {
  return res.status(status).json({
    success: false,
    message,
    error,
  });
};
