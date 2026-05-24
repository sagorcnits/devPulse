import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendError } from "../common/sendError";
import { config } from "../config/config";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;
    const cookie = req.cookies?.token;

    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : cookie;

    // Guard: no token present
    if (!token) {
      sendError(res, 401, "Unauthorized", {
        message: "Please login to access this route",
      });
      return;
    }

    // Verify and decode — throws if invalid/expired
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      sendError(res, 401, "Unauthorized", {
        message: "Your session has expired. Please login again.",
      });
      return;
    }

    if (err instanceof jwt.JsonWebTokenError) {
      sendError(res, 401, "Unauthorized", {
        message: "Invalid token. Please login again.",
      });
      return;
    }

    // Unexpected error — don't leak internals
    sendError(res, 500, "Internal Server Error", {
      message: "Something went wrong during authentication.",
    });
  }
};

export default authMiddleware;
