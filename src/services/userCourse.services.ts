import jwt from "jsonwebtoken";
import prisma from "../db/prisma";
import { CourseServices } from "./course.services";

const courseServices = new CourseServices();

export class UserCourseService {
  public async decodeToken(token: string) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      return decodedToken as jwt.JwtPayload;
    } catch (error) {
      throw new Error("invalide decode token");
    }
  }
  //create user course
  async create(token: string, courseId: number) {
    const { id: userId } = await this.decodeToken(token);
    const course = await courseServices.findById(courseId);
    const existingCourse = await prisma.userCourse.findFirst({
      where: { userId, courseId },
    });
    if (existingCourse) {
      return await prisma.userCourse.update({
        where: { id: existingCourse.id },
        data: { courseId },
      });
    }
    return await prisma.userCourse.create({ data: { userId, courseId } });
  }
  // get all course by user
  async findAll(userId: number) {
    const course = await prisma.userCourse.findMany({
      where: { userId },
      orderBy: { id: "asc" },
      select: {
        id: true,
        course: true,
      },
    });
    console.log(course);
    return course;
  }
  //remove userCourse
  async remove(userId: number, id: number) {
    const course = await prisma.userCourse.findUnique({ where: { id: id } });
    if (!course || course.userId !== userId) {
      throw new Error(`course with id${id} doesnt belong to the user`);
    }
    return await prisma.userCourse.delete({ where: { id: id } });
  }
}
