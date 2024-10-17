import { Router } from "express";
import { ScheduleController } from "../controllers/schedule.controllers";

const scheduleRouter = Router();
const scheduleController: any = new ScheduleController();

scheduleRouter.post("/create", scheduleController.create);
scheduleRouter.get("/allSchedules", scheduleController.getAllSchedule);

export default scheduleRouter;
