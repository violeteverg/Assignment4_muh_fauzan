import { Request, Response } from "express";
import { CourseServices } from "../services/course.services";
import { responseStatusMsg } from "../helpers/response";
const courseServices = new CourseServices();
export class CourseController {
  async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const { name, code, price, description, schedules } = req.body;
      const course = await courseServices.create({
        name,
        code,
        price,
        description,
        schedules,
      });
      res.status(201).json({
        code: 201,
        status: "Ok",
        data: course,
      });
    } catch (error) {
      res.status(400).json({
        code: 400,
        status: "failed",
        message: error?.message,
      });
    }
  }
  async getAllCourses(req: Request, res: Response): Promise<void> {
    try {
      const { search, page, limit } = req.query;
      const course = await courseServices.findAll(
        search as string,
        +page,
        +limit
      );
      responseStatusMsg(res, 200, "Ok", "success_data", course);
    } catch (error) {
      responseStatusMsg(
        res,
        400,
        "Failed to fetch products",
        "error",
        null,
        error
      );
    }
  }
  async getCourseById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const course = await courseServices.findById(+id);
      responseStatusMsg(res, 200, "Ok", "success_data", course);
    } catch (error) {
      responseStatusMsg(
        res,
        400,
        "Failed to fetch products",
        "error",
        null,
        error
      );
    }
  }
  async updateCourse(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      console.log(id, "ini id");
      const { name, code, price, description, schedules } = req.body;
      const course = await courseServices.update(+id, {
        name,
        code,
        price,
        description,
        schedules,
      });
      responseStatusMsg(res, 200, "Ok", "success_data", course);
    } catch (error) {
      responseStatusMsg(
        res,
        400,
        "Failed to fetch products",
        "error",
        null,
        error
      );
    }
  }
  async updateActiveCourse(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { active } = req.body;
      const course = await courseServices.updateActived(+id, active);
      responseStatusMsg(res, 200, "Ok", "success_data", course);
    } catch (error) {
      responseStatusMsg(
        res,
        400,
        "Failed to fetch products",
        "error",
        null,
        error
      );
    }
  }
  async removeCourse(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await courseServices.remove(+id);
      responseStatusMsg(res, 200, `course ${id} already removed`);
    } catch (error) {
      responseStatusMsg(
        res,
        500,
        "Failed to fetch products",
        "error",
        null,
        error
      );
    }
  }
}
