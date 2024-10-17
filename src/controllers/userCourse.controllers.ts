import { Request, Response } from "express";
import { UserCourseService } from "../services/userCourse.services";
import { responseStatusMsg } from "../helpers/response";

const userCourse = new UserCourseService();

export class UserCourseController {
  constructor() {}

  private getTokenFromCookies(req: Request) {
    const token = req.cookies["Token"];

    if (!token) {
      throw new Error("No authentication token found");
    }
    return token;
  }

  createCourse = async (req: Request, res: Response): Promise<void> => {
    try {
      const { courseId } = req.body;
      const token = this.getTokenFromCookies(req);
      const cart = await userCourse.create(token, +courseId);
      responseStatusMsg(res, 200, "Ok", "success_data", cart);
    } catch (error) {
      console.log(error);
      responseStatusMsg(
        res,
        500,
        "Failed to fetch products",
        "error",
        null,
        error
      );
    }
  };

  findAllCourse = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = this.getTokenFromCookies(req);
      const { id: userId } = await userCourse.decodeToken(token);
      const course = await userCourse.findAll(+userId);
      responseStatusMsg(res, 200, "Ok", "success_data", course);
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
  };

  removeCourse = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const token = this.getTokenFromCookies(req);
      const { id: userId } = await userCourse.decodeToken(token);
      await userCourse.remove(userId, +id);
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
  };
}
