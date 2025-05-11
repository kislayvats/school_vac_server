import { Router } from "express";
import authController from "../controllers/auth.controller";
import authMiddlewares from "../middlewares/auth.middlewares";
const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

router.get(
  "/current-user",
  authMiddlewares.authCheck,
  authController.currentUser
);

export default router;
