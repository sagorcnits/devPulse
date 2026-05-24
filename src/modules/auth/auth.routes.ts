import { Router } from "express";
import authMiddleware from "../../middleware/auth";
import checkRole from "../../middleware/checkRole";
import { registerValidation } from "../../middleware/validations/auth.validation";
import authController from "./auth.controller";
const authRouter = Router();

// all routes
authRouter.post("/register", registerValidation, authController.register);
authRouter.get(
  "/users",
  authMiddleware,
  checkRole(["maintainor"]),
  authController.getusers,
);
authRouter.get("/users/:id", authMiddleware, authController.getUserById);
authRouter.delete("/users/:id", authMiddleware, authController.deleteUser);
authRouter.patch("/users/:id", authMiddleware, authController.updateUser);
authRouter.post("/login", authController.login);
export default authRouter;
