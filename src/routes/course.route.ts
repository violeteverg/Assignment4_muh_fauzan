import { Router, Request, Response } from "express";
import { CourseController } from "../controllers/course.controllers";

const courseRouter = Router();

export interface ICourseController {
  createCourse(req: Request, res: Response): Promise<void>;
  getAllCourses(req: Request, res: Response): Promise<void>;
  getCourseById(req: Request, res: Response): Promise<void>;
  updateCourse(req: Request, res: Response): Promise<void>;
  updateActiveCourse(req: Request, res: Response): Promise<void>;
  removeCourse(req: Request, res: Response): Promise<void>;
}

const courseController: ICourseController = new CourseController();

courseRouter.post("/create", courseController.createCourse);
courseRouter.get("/allCourse", courseController.getAllCourses);
courseRouter.get("/allCourse/:id", courseController.getCourseById);
courseRouter.patch("/update/:id", courseController.updateCourse);
courseRouter.patch("/updateactive/:id", courseController.updateActiveCourse);
courseRouter.delete("/delete/:id", courseController.removeCourse);

export default courseRouter;
