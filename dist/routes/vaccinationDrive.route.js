"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
const vaccinationDrive_controller_1 = __importDefault(require("../controllers/vaccinationDrive.controller"));
const router = (0, express_1.Router)();
router.post("/create", auth_middlewares_1.default.authCheck, vaccinationDrive_controller_1.default.createVaccinationDrive);
router.get("/", auth_middlewares_1.default.authCheck, vaccinationDrive_controller_1.default.getVaccinationDrives);
router.get("/students/:id", auth_middlewares_1.default.authCheck, vaccinationDrive_controller_1.default.getVaccinationDriveStudentsById);
router.put("/update", auth_middlewares_1.default.authCheck, vaccinationDrive_controller_1.default.updateVaccinationDriveById);
router.put("/update-vaccination-drive-student", auth_middlewares_1.default.authCheck, vaccinationDrive_controller_1.default.updateStudentVaccinationDrive);
router.get("/all/statistics", auth_middlewares_1.default.authCheck, vaccinationDrive_controller_1.default.getVaccinationStatistics);
router.get("/data/statistics", auth_middlewares_1.default.authCheck, vaccinationDrive_controller_1.default.getVaccinationDriveStatistics);
exports.default = router;
//# sourceMappingURL=vaccinationDrive.route.js.map