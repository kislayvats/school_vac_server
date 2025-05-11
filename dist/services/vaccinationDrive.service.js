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
const response_dto_1 = require("../dto/response.dto");
const vaccinationdrive_schema_1 = __importDefault(require("../schemas/vaccinationdrive.schema"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const student_schema_1 = __importDefault(require("../schemas/student.schema"));
const createVaccinationDrive = (_a) => __awaiter(void 0, [_a], void 0, function* ({ vaccine_name, drive_date, available_doses, applicable_classes, }) {
    const vaccinationDrive = yield vaccinationdrive_schema_1.default.create({
        vaccine_name,
        drive_date,
        available_doses,
        applicable_classes,
    });
    return new response_dto_1.ResponseDto(http_status_codes_1.default.CREATED, "Vaccination drive created successfully", vaccinationDrive);
});
const getVaccinationDrives = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = query;
    const skip = (page - 1) * limit;
    let searchQuery = {};
    if (query.search) {
        searchQuery = {
            $or: [{ vaccine_name: { $regex: query.search, $options: "i" } }],
        };
    }
    const vaccination_drives = yield vaccinationdrive_schema_1.default.find(searchQuery)
        .skip(skip)
        .limit(limit);
    const totalCounts = yield vaccinationdrive_schema_1.default.countDocuments(searchQuery);
    return new response_dto_1.ResponseDto(http_status_codes_1.default.OK, "Vaccination drives fetched successfully", {
        vaccination_drives,
        totalCounts,
        totalPages: Math.ceil(totalCounts / limit),
    });
});
const getVaccinationDriveStudentsById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const vaccinationDrive = yield vaccinationdrive_schema_1.default.findById(id);
    const { page, limit } = query;
    const skip = (page - 1) * limit;
    const students = yield student_schema_1.default.find({
        class: { $in: vaccinationDrive.applicable_classes },
    })
        .skip(skip)
        .limit(limit);
    const totalCounts = yield student_schema_1.default.countDocuments({
        class: { $in: vaccinationDrive.applicable_classes },
    });
    if (!vaccinationDrive) {
        return new response_dto_1.ResponseDto(http_status_codes_1.default.NOT_FOUND, "Vaccination drive not found", null);
    }
    return new response_dto_1.ResponseDto(http_status_codes_1.default.OK, "Vaccination drive fetched successfully", {
        vaccination_drive: vaccinationDrive,
        students,
        totalCounts,
        totalPages: Math.ceil(totalCounts / limit),
    });
});
const getVaccinationDriveCompletedStudentsById = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = query;
    const skip = (page - 1) * limit;
    const students = yield student_schema_1.default.find({
        vaccination_drives: { $in: [id] },
    })
        .skip(skip)
        .limit(limit);
    const totalCounts = yield student_schema_1.default.countDocuments({
        vaccination_drives: { $in: [id] },
    });
    return new response_dto_1.ResponseDto(http_status_codes_1.default.OK, "Vaccination drive fetched successfully", {
        students,
        totalCounts,
        totalPages: Math.ceil(totalCounts / limit),
    });
});
const updateVaccinationDriveById = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const vaccinationDrive = yield vaccinationdrive_schema_1.default.findByIdAndUpdate(id, body, {
        new: true,
    });
    if (!vaccinationDrive) {
        return new response_dto_1.ResponseDto(http_status_codes_1.default.NOT_FOUND, "Vaccination drive not found", null);
    }
    return new response_dto_1.ResponseDto(http_status_codes_1.default.OK, "Vaccination drive updated successfully", vaccinationDrive);
});
const getVaccinationStatistics = () => __awaiter(void 0, void 0, void 0, function* () {
    // Get total number of students
    const totalStudents = yield student_schema_1.default.countDocuments();
    // Get number of students with at least one vaccination
    const vaccinatedStudents = yield student_schema_1.default.countDocuments({
        vaccination_drives: { $exists: true, $ne: [] },
    });
    // Calculate vaccination percentage
    const vaccinationPercentage = (vaccinatedStudents / totalStudents) * 100;
    // Get upcoming vaccination drives in next 30 days
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const upcomingDrives = yield vaccinationdrive_schema_1.default.find({
        drive_date: {
            $gte: new Date(),
            $lte: thirtyDaysFromNow,
        },
    }).sort({ drive_date: 1 });
    return new response_dto_1.ResponseDto(http_status_codes_1.default.OK, "Vaccination statistics fetched successfully", {
        totalStudents,
        vaccinatedStudents,
        vaccinationPercentage: Math.round(vaccinationPercentage * 100) / 100,
        upcomingDrives,
    });
});
const getVaccinationDriveStatistics = (driveId) => __awaiter(void 0, void 0, void 0, function* () {
    // Get total number of students
    const totalStudents = yield student_schema_1.default.countDocuments();
    // Get number of students with at least one vaccination
    const vaccinatedStudents = yield student_schema_1.default.countDocuments({
        vaccination_drives: { $in: [driveId] },
    });
    const vaccinationDrive = yield vaccinationdrive_schema_1.default.findById(driveId);
    // Calculate vaccination percentage
    const vaccinationPercentage = (vaccinatedStudents / totalStudents) * 100;
    return new response_dto_1.ResponseDto(http_status_codes_1.default.OK, "Vaccination statistics fetched successfully", {
        vaccinationDrive,
        totalStudents,
        vaccinatedStudents,
        notVaccinatedStudents: totalStudents - vaccinatedStudents,
        vaccinationPercentage: Math.round(vaccinationPercentage * 100) / 100,
    });
});
const updateStudentVaccinationDrive = (studentId, vaccinationDriveId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_schema_1.default.findByIdAndUpdate(studentId, {
        $push: {
            vaccination_drives: vaccinationDriveId,
        },
    });
    if (!student) {
        return new response_dto_1.ResponseDto(http_status_codes_1.default.NOT_FOUND, "Student not found", null);
    }
    return new response_dto_1.ResponseDto(http_status_codes_1.default.OK, "Student updated successfully", student);
});
exports.default = {
    createVaccinationDrive,
    getVaccinationDrives,
    getVaccinationDriveStudentsById,
    getVaccinationDriveCompletedStudentsById,
    updateVaccinationDriveById,
    getVaccinationStatistics,
    updateStudentVaccinationDrive,
    getVaccinationDriveStatistics,
};
//# sourceMappingURL=vaccinationDrive.service.js.map