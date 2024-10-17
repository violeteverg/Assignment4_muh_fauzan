import prisma from "../src/db/prisma";
import {
  users,
  courses,
  schedules,
  courseSchedules,
  userCourses,
} from "./data";

const load = async () => {
  try {
    // Delete existing data in tables
    await prisma.userCourse.deleteMany();
    await prisma.courseSchedule.deleteMany();
    await prisma.schedule.deleteMany();
    await prisma.course.deleteMany();
    await prisma.user.deleteMany();
    console.log("Deleted records in all related tables");

    // Reset sequences
    await prisma.$queryRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1;`;
    await prisma.$queryRaw`ALTER SEQUENCE "Course_id_seq" RESTART WITH 1;`;
    await prisma.$queryRaw`ALTER SEQUENCE "Schedule_id_seq" RESTART WITH 1;`;
    await prisma.$queryRaw`ALTER SEQUENCE "userCourse_id_seq" RESTART WITH 1;`;
    await prisma.$queryRaw`ALTER SEQUENCE "CourseSchedule_id_seq" RESTART WITH 1;`;
    console.log("Reset ID sequences for all tables");

    // Insert new seed data
    await prisma.user.createMany({
      data: users,
    });
    console.log("Added user data");

    await prisma.course.createMany({
      data: courses,
    });
    console.log("Added course data");

    await prisma.schedule.createMany({
      data: schedules,
    });
    console.log("Added schedule data");

    await prisma.courseSchedule.createMany({
      data: courseSchedules,
    });
    console.log("Added course schedule data");

    await prisma.userCourse.createMany({
      data: userCourses,
    });
    console.log("Added user course data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
