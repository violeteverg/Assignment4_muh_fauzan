import { Router, Request, Response } from "express";
import { UserCourseController } from "../controllers/userCourse.controllers";

const userCourseRouter = Router();

export interface IUserCourseController {
  createCourse(req: Request, res: Response): Promise<void>;
  findAllCourse(req: Request, res: Response): Promise<void>;
  removeCourse(req: Request, res: Response): Promise<void>;
}

const userCourseController: IUserCourseController = new UserCourseController();

userCourseRouter.post("/addlearning", userCourseController.createCourse);
userCourseRouter.get("/mylearning", userCourseController.findAllCourse);
userCourseRouter.delete("/delete/:id", userCourseController.removeCourse);

export default userCourseRouter;
