import { Request, Response } from "express";
import { sendResponse } from "../../common/sendResponse";
import authModel from "./auth.model";
const authController = {
  register: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const user = {
      name,
      email,
      password,
    };

    try {
      const users = await authModel.createUser(user);
      return sendResponse(200, "User created successfully", users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default authController;
