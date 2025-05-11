import { Router } from "express";
import authMiddlewares from "../middlewares/auth.middlewares";
import vaccinationDriveController from "../controllers/vaccinationDrive.controller";

const router = Router();

router.post(
  "/create",
  authMiddlewares.authCheck,
  vaccinationDriveController.createVaccinationDrive
);

router.get(
  "/",
  authMiddlewares.authCheck,
  vaccinationDriveController.getVaccinationDrives
);

router.get(
  "/students/:id",
  authMiddlewares.authCheck,
  vaccinationDriveController.getVaccinationDriveStudentsById
);

router.put(
  "/update",
  authMiddlewares.authCheck,
  vaccinationDriveController.updateVaccinationDriveById
);

router.put(
  "/update-vaccination-drive-student",
  authMiddlewares.authCheck,
  vaccinationDriveController.updateStudentVaccinationDrive
);

router.get(
  "/all/statistics",
  authMiddlewares.authCheck,
  vaccinationDriveController.getVaccinationStatistics
);

router.get(
  "/data/statistics",
  authMiddlewares.authCheck,
  vaccinationDriveController.getVaccinationDriveStatistics
);

export default router;
