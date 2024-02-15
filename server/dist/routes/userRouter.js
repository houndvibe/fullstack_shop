import { Router } from "express";
import userController from "../controllers/userController.js";
const router = Router();
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/checkAuth", userController.checkAuth);
export default router;
