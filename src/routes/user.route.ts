import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/auth.controllers";

const userRouter = Router();

export interface IAuthContorller {
  register(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
}

const authController: IAuthContorller = new AuthController();

userRouter.post("/register", authController.register);
userRouter.post("/login", authController.login);

export default userRouter;
