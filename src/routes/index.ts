import authRoutes from "./auth.route";
import express from "express";
import studentRoutes from "./student.route";
import vaccinationDriveRoutes from "./vaccinationDrive.route";
const router = express.Router();

const routes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/student",
    route: studentRoutes,
  },
  {
    path: "/vaccination-drive",
    route: vaccinationDriveRoutes,
  },
];

routes.forEach((obj) => {
  router.use(obj.path, obj.route);
});

export default router;
