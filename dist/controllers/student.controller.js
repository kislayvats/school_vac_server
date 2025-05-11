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
const student_service_1 = __importDefault(require("../services/student.service"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const user = yield student_service_1.default.addStudent(req.body);
        res.status(user.statusCode).json(user);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Error adding student",
            error,
        });
    }
});
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, search } = req.query;
    try {
        console.log(page, limit, search);
        const students = yield student_service_1.default.getStudents({
            page: Number(page),
            limit: Number(limit),
            search: String(search),
        });
        res.status(students.statusCode).json(students);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Error fetching students",
            error,
        });
    }
});
const bulkAddStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).json({ message: "No file uploaded" });
        }
        const studentFile = { file };
        yield student_service_1.default.bulkAddStudents(studentFile);
        res.status(200).json({ message: "Students added successfully" });
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Error adding students",
            error,
        });
    }
});
const downloadStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield student_service_1.default.downloadStudent();
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=students.csv");
        res.status(response.statusCode).send(response.data);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Error downloading student",
            error,
        });
    }
});
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { student_id } = req.query;
        const student = yield student_service_1.default.updateStudent(student_id, req.body);
        res.status(student.statusCode).json(student);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Error updating student",
            error,
        });
    }
});
exports.default = {
    addStudent,
    getStudents,
    bulkAddStudents,
    downloadStudent,
    updateStudent,
};
//# sourceMappingURL=student.controller.js.map