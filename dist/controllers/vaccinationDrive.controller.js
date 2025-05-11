"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const vaccinationDrive_service_1 = __importDefault(require("../services/vaccinationDrive.service"));
const user_enum_1 = require("../enum/user.enum");
const createVaccinationDrive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vaccinationDrive = req.body;
        console.log(vaccinationDrive);
        const vaccinationDriveResponse = yield vaccinationDrive_service_1.default.createVaccinationDrive(vaccinationDrive);
        res
            .status(vaccinationDriveResponse.statusCode)
            .json(vaccinationDriveResponse);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Error creating vaccination drive",
            error,
        });
    }
});
const getVaccinationDrives = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, search } = req.query;
        const vaccinationDrives = yield vaccinationDrive_service_1.default.getVaccinationDrives({
            page: Number(page),
            limit: Number(limit),
            search: search,
        });
        res.status(vaccinationDrives.statusCode).json(vaccinationDrives);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Error getting vaccination drives",
            error,
        });
    }
});
const getVaccinationDriveStudentsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { page, limit, status } = req.query;
        let vaccinationDrive;
        if (status === user_enum_1.VaccinationDriveStatus.COMPLETED) {
            vaccinationDrive =
                yield vaccinationDrive_service_1.default.getVaccinationDriveCompletedStudentsById(id, { page: Number(page), limit: Number(limit) });
            res.status(vaccinationDrive.statusCode).json(vaccinationDrive);
        }
        else {
            vaccinationDrive =
                yield vaccinationDrive_service_1.default.getVaccinationDriveStudentsById(id, {
                    page: Number(page),
                    limit: Number(limit),
                });
        }
        res.status(vaccinationDrive.statusCode).json(vaccinationDrive);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Error getting vaccination drive by id",
            error,
        });
    }
});
const updateVaccinationDriveById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { vaccination_drive_id } = req.query;
        const vaccinationDrive = yield vaccinationDrive_service_1.default.updateVaccinationDriveById(vaccination_drive_id, req.body);
        res.status(vaccinationDrive.statusCode).json(vaccinationDrive);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Error updating vaccination drive by id",
            error,
        });
    }
});
const getVaccinationStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vaccinationStatistics = yield vaccinationDrive_service_1.default.getVaccinationStatistics();
        res.status(vaccinationStatistics.statusCode).json(vaccinationStatistics);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Error getting vaccination statistics",
            error,
        });
    }
});
const updateStudentVaccinationDrive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student_id, vaccination_drive_id } = req.body;
        const vaccinationDrive = yield vaccinationDrive_service_1.default.updateStudentVaccinationDrive(student_id, vaccination_drive_id);
        res.status(vaccinationDrive.statusCode).json(vaccinationDrive);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Error updating student vaccination drive",
            error,
        });
    }
});
const getVaccinationDriveStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { vaccination_drive_id } = req.query;
        const vaccinationDriveStatistics = yield vaccinationDrive_service_1.default.getVaccinationDriveStatistics(vaccination_drive_id);
        res
            .status(vaccinationDriveStatistics.statusCode)
            .json(vaccinationDriveStatistics);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Error getting vaccination drive statistics",
            error,
        });
    }
});
exports.default = {
    createVaccinationDrive,
    getVaccinationDrives,
    getVaccinationDriveStudentsById,
    updateVaccinationDriveById,
    getVaccinationStatistics,
    updateStudentVaccinationDrive,
    getVaccinationDriveStatistics,
};
//# sourceMappingURL=vaccinationDrive.controller.js.map