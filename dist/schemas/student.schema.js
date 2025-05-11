"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    student_id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    mobile_number: {
        type: String,
        required: true,
        trim: true,
    },
    class: {
        type: String,
        required: true,
        trim: true,
    },
    vaccination_drives: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "VaccinationDrive",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("Student", studentSchema);
//# sourceMappingURL=student.schema.js.map