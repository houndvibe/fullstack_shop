import { Router } from "express";
import userRouter from "./userRouter.js";
import deviceRouter from "./deviceRouter.js";

const router = Router();

router.use("/user", userRouter);
router.use("/device", deviceRouter);
export default router;
