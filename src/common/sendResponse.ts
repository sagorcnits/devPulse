import { Response } from "express";

export const sendResponse = <T>(
  res: Response,
  status: number,
  message: string,
  data: T,
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};
