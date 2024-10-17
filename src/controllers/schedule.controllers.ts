import { Request, Response } from "express";
import { SchedulesService } from "../services/schedule.services";
const schedulesService = new SchedulesService();
export class ScheduleController {
  async create(req: Request, res: Response) {
    try {
      const { date } = req.body;
      const schedule = await schedulesService.createSchedule({ date });
      return res.status(201).json({
        code: 201,
        status: "Ok",
        data: schedule,
      });
    } catch (error) {
      return res.status(400).json({
        code: 400,
        status: "failed created schedule",
        message: error,
      });
    }
  }
  async getAllSchedule(req: Request, res: Response) {
    try {
      const schedule = await schedulesService.getAllSchedule();
      return res.status(200).json({
        code: 200,
        status: "Ok",
        data: schedule,
      });
    } catch (error) {
      return res.status(400).json({
        code: 400,
        status: "failed get schedule",
        message: error,
      });
    }
  }
}
