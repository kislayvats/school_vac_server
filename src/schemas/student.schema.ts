import mongoose from "mongoose";
import { VaccinationStatus } from "../enum/user.enum";
const studentSchema = new mongoose.Schema(
  {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "VaccinationDrive",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
