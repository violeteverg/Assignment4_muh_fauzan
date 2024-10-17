import prisma from "../db/prisma";
import { scheduleSchema } from "../schemas/scheduleSchema";

export class SchedulesService {
  async createSchedule(data: any) {
    console.log(data);
    const validationData = scheduleSchema.parse(data);
    const schedule = await prisma.schedule.create({
      data: { date: validationData.date },
    });
    return schedule;
  }

  async getAllSchedule() {
    return await prisma.schedule.findMany();
  }
}
