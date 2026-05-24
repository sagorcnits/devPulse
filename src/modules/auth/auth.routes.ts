import { Router } from "express";
import { registerValidation } from "../../middleware/validations/auth.validation";
import authController from "./auth.controller";

const authRouter = Router();

authRouter.post("/register", registerValidation, authController.register);
authRouter.get("/users", authController.getusers);
authRouter.get("/users/:id", authController.getUserById);
authRouter.delete("/users/:id", authController.deleteUser);
export default authRouter;
