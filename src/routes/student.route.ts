import { Router } from "express";

import authMiddlewares from "../middlewares/auth.middlewares";
import studentController from "../controllers/student.controller";
import { upload } from "../middlewares/upload.middleware";
const router = Router();

router.post("/add", authMiddlewares.authCheck, studentController.addStudent);

router.get("/", authMiddlewares.authCheck, studentController.getStudents);

router.put(
  "/update",
  authMiddlewares.authCheck,
  studentController.updateStudent
);

router.post(
  "/bulk-add",
  authMiddlewares.authCheck,
  upload.single("file"),
  studentController.bulkAddStudents
);

router.get("/download", studentController.downloadStudent);

export default router;
