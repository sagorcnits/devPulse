import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password } = req.body;

  if (!registerSchema.safeParse({ name, email, password })) {
    return res.status(400).json({
      message: "Invalid request body",
    });
  }

  next();
};
