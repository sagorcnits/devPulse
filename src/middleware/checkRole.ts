import { NextFunction, Request, Response } from "express";
import { sendError } from "../common/sendError";

const checkRole = (role: string[]) => {
  // return
  return (req: Request, res: Response, next: NextFunction) => {
    const { role: userRole } = req.body;

    if (role.includes(userRole)) {
      next();
    } else {
      sendError(res, 401, "Unauthorized", "");
    }
  };
};

export default checkRole;
