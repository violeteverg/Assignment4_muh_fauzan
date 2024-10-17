import { Router } from "express";
import userRouter from "./user.route";
import scheduleRouter from "./schedule.route";
import courseRouter from "./course.route";
import userCourseRouter from "./userCourse.route";

const router = Router();

router.use("/auth", userRouter);
router.use("/schedule", scheduleRouter);
router.use("/course", courseRouter);
router.use("/usercourse", userCourseRouter);

export default router;
