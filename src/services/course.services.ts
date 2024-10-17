import prisma from "../db/prisma";
import { paginate } from "../helpers/pagination";
import { courseSchema } from "../schemas/courseSchema";

export type dataCourse = {
  name: string;
  code: string;
  price: number;
  description: string;
  schedules: number[];
};

export class CourseServices {
  //create course
  async create(data: dataCourse) {
    const validationData = courseSchema.parse(data);
    const course = await prisma.course.create({
      data: {
        name: validationData.name,
        code: validationData.code,
        price: validationData.price,
        description: validationData.description,
        courseSchedules: {
          create: data.schedules.map((schedule) => ({
            schedule: {
              connect: { id: schedule },
            },
          })),
        },
      },
      include: { courseSchedules: { select: { schedule: true } } },
    });
    return course;
  }
  //get all course
  async findAll(search: string, page: number, limit: number) {
    const course = await prisma.course.findMany({
      where: {
        ...(search && {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              code: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
      },
      orderBy: { id: "asc" },
      include: {
        courseSchedules: {
          select: {
            schedule: true,
          },
        },
      },
    });
    const { data, pagination } = paginate(course, page, limit);
    return { data, pagination };
  }
  // get course by id
  async findById(id: number) {
    const course = await prisma.course.findUnique({
      where: { id: id },
      include: { courseSchedules: { select: { schedule: true } } },
    });
    return course;
  }
  // update course
  async update(id: number, data: any) {
    const courseId = await prisma.course.findUnique({
      where: { id: id },
      include: { courseSchedules: { select: { scheduleId: true } } },
    });

    if (!courseId) {
      throw new Error(`Course with id ${id} is not found in database`);
    }

    const existSchdules = courseId.courseSchedules.map(
      (schedule) => schedule.scheduleId
    );

    if (data.schedules) {
      const schedule = existSchdules.filter(
        (id) => !data.schedules.includes(id)
      );

      if (schedule.length > 0) {
        await prisma.courseSchedule.deleteMany({
          where: {
            courseId: id,
            scheduleId: { in: schedule },
          },
        });
      }

      const schedulesSucces = data.schedules.filter(
        (scheduleId: any) => !existSchdules.includes(scheduleId)
      );

      if (schedulesSucces.length > 0) {
        const newSchedules = schedulesSucces.map((scheduleId: any) => ({
          courseId: id,
          scheduleId,
        }));
        await prisma.courseSchedule.createMany({
          data: newSchedules,
        });
      }
    }

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.code !== undefined) updateData.code = data.code;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.description !== undefined)
      updateData.description = data.description;

    const updatedCourse = await prisma.course.update({
      where: { id: id },
      data: updateData,
      include: { courseSchedules: { include: { schedule: true } } },
    });

    return updatedCourse;
  }

  async updateActived(id: number, active: boolean) {
    const courseId = await prisma.course.findUnique({ where: { id: id } });
    if (!courseId) {
      throw new Error(`course with id${id} not found in database`);
    }
    const course = await prisma.course.update({
      where: { id: id },
      data: { active: active },
    });
    return course;
  }
  // delete course
  async remove(id: number) {
    const course = await prisma.course.findUnique({
      where: { id },
      include: { courseSchedules: true },
    });
    if (!course) {
      throw new Error(`Course with id ${id} is not found in database`);
    }
    await prisma.courseSchedule.deleteMany({
      where: { courseId: id },
    });
    await prisma.course.delete({
      where: { id },
    });
    return { message: "Course deleted successfully" };
  }
}
