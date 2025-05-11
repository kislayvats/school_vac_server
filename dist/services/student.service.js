"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const student_schema_1 = __importDefault(require("../schemas/student.schema"));
const counter_schema_1 = __importDefault(require("../schemas/counter.schema"));
const stream_1 = require("stream");
const csv_parser_1 = __importDefault(require("csv-parser"));
const XLSX = __importStar(require("xlsx"));
const json_2_csv_1 = require("json-2-csv");
const addStudent = (student) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("services", student);
    const counter = yield counter_schema_1.default.findOneAndUpdate({}, { $inc: { seq: 1 } }, { new: true, upsert: true });
    const newStudent = new student_schema_1.default({
        class: student.class,
        email: student.email,
        name: student.name,
        mobile_number: student.mobile_number,
        student_id: `S-${counter.seq}`,
    });
    yield newStudent.save();
    return new response_dto_1.ResponseDto(http_status_codes_1.default.OK, "Student added successfully", newStudent);
});
const getStudents = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, search } = query;
    const skip = (page - 1) * limit;
    let searchQuery = {};
    if (search) {
        searchQuery = {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { studentId: { $regex: search, $options: "i" } },
                { mobileNumber: { $regex: search, $options: "i" } },
                { class: { $regex: search, $options: "i" } },
            ],
        };
    }
    const totalCounts = yield student_schema_1.default.countDocuments(searchQuery);
    const students = yield student_schema_1.default.find(searchQuery).skip(skip).limit(limit);
    return new response_dto_1.ResponseDto(http_status_codes_1.default.OK, "Students fetched successfully", {
        students,
        totalCounts: totalCounts,
        totalPages: Math.ceil(totalCounts / limit),
    });
});
const bulkAddStudents = (studentFile) => __awaiter(void 0, void 0, void 0, function* () {
    const file = studentFile.file;
    if (!file) {
        throw new Error("No file uploaded");
    }
    const fileType = file.originalname.split(".").pop().toLowerCase();
    let rows = [];
    if (fileType == "csv") {
        const bufferStream = new stream_1.Readable();
        bufferStream.push(file.buffer);
        bufferStream.push(null);
        rows = yield new Promise((resolve, reject) => {
            const results = [];
            bufferStream
                .pipe((0, csv_parser_1.default)())
                .on("data", (data) => results.push(data))
                .on("end", () => resolve(results))
                .on("error", (error) => reject(error));
        });
    }
    else if (fileType == "xlsx") {
        const workbook = XLSX.read(file.buffer);
        const sheetName = workbook.SheetNames[0];
        rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }
    if (!rows.length) {
        throw new Error("No data found in the uploaded file");
    }
    console.log("bulkupload", rows);
    let newStudents = [];
    for (const student of rows) {
        const counter = yield counter_schema_1.default.findOneAndUpdate({}, { $inc: { seq: 1 } }, { new: true, upsert: true });
        const newStudent = Object.assign(Object.assign({}, student), { student_id: `S-${counter.seq}` });
        newStudents.push(newStudent);
    }
    const result = yield student_schema_1.default.insertMany(newStudents);
    return new response_dto_1.ResponseDto(http_status_codes_1.default.OK, "Students added successfully", rows);
});
const downloadStudent = () => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield student_schema_1.default.find().select("-__v");
    if (!students || students.length === 0) {
        return new response_dto_1.ResponseDto(http_status_codes_1.default.NOT_FOUND, "No students found", null);
    }
    // Fields to include in CSV
    const fields = [
        "name",
        "email",
        "mobile_number",
        "class",
        "createdAt",
        "student_id",
    ];
    const opts = { keys: fields };
    const csv = (0, json_2_csv_1.json2csv)(students, opts);
    return new response_dto_1.ResponseDto(http_status_codes_1.default.OK, "Students fetched successfully", csv);
});
const updateStudent = (studentId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_schema_1.default.findByIdAndUpdate(studentId, data, {
        new: true,
    });
    if (!student) {
        return new response_dto_1.ResponseDto(http_status_codes_1.default.NOT_FOUND, "Student not found", null);
    }
    return new response_dto_1.ResponseDto(http_status_codes_1.default.OK, "Student updated successfully", student);
});
exports.default = {
    addStudent,
    getStudents,
    bulkAddStudents,
    downloadStudent,
    updateStudent,
};
//# sourceMappingURL=student.service.js.map