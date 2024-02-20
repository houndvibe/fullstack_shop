import { Router } from "express";
import deviceController from "../controllers/deviceController.js";

const router = Router();

router.post("/", deviceController.addOne);
router.get("/", deviceController.getAll);

export default router;
