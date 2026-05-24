import { Request, Response } from "express";
import { sendResponse } from "../../common/sendResponse";
import { generateHasPassword } from "../../utils/hash-passowrd";
import authModel from "./auth.model";
import authService from "./auth.services";
import { TUser } from "./auth.types";
const authController = {
  register: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

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
      const { name, email, password } = req.body;

      const user = {
        name,
        email,
        password,
      };

      const users = await authService.updateUser(Number(id), user as TUser);
      console.log(users);
      return sendResponse(res, 200, "User updated successfully", users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default authController;
