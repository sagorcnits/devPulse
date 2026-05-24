import { Request, Response } from "express";
import { sendError } from "../../common/sendError";
import { sendResponse } from "../../common/sendResponse";
import generateToken from "../../utils/generate-token";
import {
  comparePassword,
  generateHasPassword,
} from "../../utils/hash-passowrd";
import authModel from "./auth.model";
import authService from "./auth.services";
import { TUser } from "./auth.types";
// controller
const authController = {
  register: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existingUser: any = await authService.getUserByEmail(email);
    console.log(existingUser);
    if (existingUser?.length > 0) {
      return res.status(404).json({
        success: false,
        message: "User Already Exist",
      });
    }

    const hashPassword = generateHasPassword(password);
    const user = {
      name,
      email,
      password: hashPassword,
    };

    try {
      const users = await authModel.createUser(user as TUser);
      console.log(users);
      return sendResponse(res, 200, "User created successfully", users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser: any = await authService.getUserByEmail(email);
    // generate token

    if (existingUser?.length > 0) {
      const user = existingUser[0];
      const isPasswordCorrect = await comparePassword(password, user.password);
      if (isPasswordCorrect) {
        const token = generateToken(existingUser[0]);
        return sendResponse(res, 200, "User logged in successfully", {
          token,
          user,
        });
      } else {
        sendError(res, 404, "Invalid creadentials", "");
      }
    } else {
      sendError(res, 404, "User not found", "");
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const users = await authService.deleteUser(Number(id));
      console.log(users);
      return sendResponse(res, 200, "User deleted successfully", users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getusers: async (req: Request, res: Response) => {
    try {
      const users = await authService.getUsers();
      console.log(users);
      return sendResponse(res, 200, "Users fetched successfully", users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUserById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const users = await authService.getUserById(Number(id));
      console.log(users);
      return sendResponse(res, 200, "User fetched successfully", users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existingUser = await authService.getUserById(Number(id));

      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const { name, role, password } = req.body;

      const user: Partial<TUser> = {};

      if (name) {
        user.name = name;
      }

      if (role) {
        user.role = role;
      }

      if (password) {
        user.password = await generateHasPassword(password);
      }

      const users = await authService.updateUser(Number(id), user as TUser);

      return sendResponse(res, 200, "User updated successfully", users);
    } catch (error: any) {
      console.log(error);

      return sendError(res, 500, error.message, error);
    }
  },
};

export default authController;
