import { NextFunction, Request, Response } from "express";
import { sendError } from "../common/sendError";

const checkRole = (role: string[]) => {
  // return
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);
    if (role.includes(req?.user?.role)) {
      next();
    } else {
      sendError(res, 401, "Unauthorized", "");
    }
  };
};

export default checkRole;
