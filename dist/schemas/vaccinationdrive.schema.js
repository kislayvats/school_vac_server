"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_enum_1 = require("../enum/user.enum");
const vaccinationDriveSchema = new mongoose_1.default.Schema({
    vaccine_name: {
        type: String,
        required: true,
        trim: true,
    },
    drive_date: {
        type: Date,
        required: true,
    },
    available_doses: {
        type: Number,
        required: true,
        min: 0,
    },
    applicable_classes: [
        {
            type: String,
            required: true,
        },
    ],
    status: {
        type: String,
        enum: user_enum_1.VaccinationDriveStatus,
        default: user_enum_1.VaccinationDriveStatus.SCHEDULED,
    },
}, { timestamps: true });
const VaccinationDrive = mongoose_1.default.model("VaccinationDrive", vaccinationDriveSchema);
// vaccinationDriveSchema.pre("save", async function (next) {
//   if (this.isModified("drive_date")) {
//     const conflictingDrive = await VaccinationDrive.findOne({
//       _id: { $ne: this._id },
//       drive_date: {
//         $gte: new Date(this.drive_date.getTime() - 15 * 24 * 60 * 60 * 1000),
//         $lte: new Date(this.drive_date.getTime() + 15 * 24 * 60 * 60 * 1000),
//       },
//     });
//     if (conflictingDrive) {
//       next(
//         new Error(
//           "A vaccination drive already exists within 15 days of this date"
//         )
//       );
//     }
//   }
//   next();
// });
exports.default = VaccinationDrive;
//# sourceMappingURL=vaccinationdrive.schema.js.map