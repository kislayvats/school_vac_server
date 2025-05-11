import {
  StudentFile,
  StudentRegisterDto,
  StudentResponseDto,
} from "../interfaces/student.interface";
import { ResponseDto } from "../dto/response.dto";
import { FilterQuery } from "../interfaces/filterQuery.interface";
import { StudentResponse } from "../interfaces/student.interface";
import { StudentDocument } from "../schemas/models/student.model";
import { UserType } from "../interfaces/user.interface";
import HttpStatus from "http-status-codes";
import Student from "../schemas/student.schema";
import Counter from "../schemas/counter.schema";
import { Readable } from "stream";
import csv from "csv-parser";
import * as XLSX from "xlsx";
import { json2csv, Json2CsvOptions } from "json-2-csv";
const addStudent = async (
  student: StudentRegisterDto
): Promise<ResponseDto<Partial<UserType>>> => {
  console.log("services", student);
  const counter = await Counter.findOneAndUpdate(
    {},
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  const newStudent = new Student({
    class: student.class,
    email: student.email,
    name: student.name,
    mobile_number: student.mobile_number,
    student_id: `S-${counter.seq}`,
  });
  await newStudent.save();
  return new ResponseDto(
    HttpStatus.OK,
    "Student added successfully",
    newStudent
  );
};

const getStudents = async (
  query: FilterQuery
): Promise<
  ResponseDto<StudentResponse<StudentDocument<Partial<StudentResponseDto>>[]>>
> => {
  const { page, limit, search } = query;
  const skip = (page - 1) * limit;
  let searchQuery: any = {};
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
  const totalCounts = await Student.countDocuments(searchQuery);
  const students = await Student.find(searchQuery).skip(skip).limit(limit);

  return new ResponseDto(HttpStatus.OK, "Students fetched successfully", {
    students,
    totalCounts: totalCounts,
    totalPages: Math.ceil(totalCounts / limit),
  });
};

const bulkAddStudents = async (
  studentFile: StudentFile
): Promise<ResponseDto<any>> => {
  const file = studentFile.file;
  if (!file) {
    throw new Error("No file uploaded");
  }
  const fileType = file.originalname.split(".").pop().toLowerCase();
  let rows = [];
  if (fileType == "csv") {
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null);
    rows = await new Promise((resolve, reject) => {
      const results = [];
      bufferStream
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (error) => reject(error));
    });
  } else if (fileType == "xlsx") {
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
    const counter = await Counter.findOneAndUpdate(
      {},
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const newStudent = {
      ...student,
      student_id: `S-${counter.seq}`,
    };
    newStudents.push(newStudent);
  }
  const result = await Student.insertMany(newStudents);
  return new ResponseDto(HttpStatus.OK, "Students added successfully", rows);
};

const downloadStudent = async (): Promise<ResponseDto<any>> => {
  const students = await Student.find().select("-__v");
  if (!students || students.length === 0) {
    return new ResponseDto(HttpStatus.NOT_FOUND, "No students found", null);
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
  const opts: Json2CsvOptions = { keys: fields };
  const csv = json2csv(students, opts);
  return new ResponseDto(HttpStatus.OK, "Students fetched successfully", csv);
};

const updateStudent = async (
  studentId: string,
  data: any
): Promise<ResponseDto<any>> => {
  const student = await Student.findByIdAndUpdate(studentId, data, {
    new: true,
  });
  if (!student) {
    return new ResponseDto(HttpStatus.NOT_FOUND, "Student not found", null);
  }
  return new ResponseDto(
    HttpStatus.OK,
    "Student updated successfully",
    student
  );
};

export default {
  addStudent,
  getStudents,
  bulkAddStudents,
  downloadStudent,
  updateStudent,
};
