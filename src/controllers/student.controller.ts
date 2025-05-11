import studentService from "../services/student.service";
import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { StudentFile } from "../interfaces/student.interface";
const addStudent = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const user = await studentService.addStudent(req.body);
    res.status(user.statusCode).json(user);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error adding student",
      error,
    });
  }
};

const getStudents = async (req: Request, res: Response) => {
  const { page, limit, search } = req.query;
  try {
    console.log(page, limit, search);
    const students = await studentService.getStudents({
      page: Number(page),
      limit: Number(limit),
      search: String(search),
    });
    res.status(students.statusCode).json(students);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching students",
      error,
    });
  }
};

const bulkAddStudents = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
    }
    const studentFile: StudentFile = { file };
    await studentService.bulkAddStudents(studentFile);
    res.status(200).json({ message: "Students added successfully" });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error adding students",
      error,
    });
  }
};

const downloadStudent = async (req: Request, res: Response) => {
  try {
    const response = await studentService.downloadStudent();
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=students.csv");
    res.status(response.statusCode).send(response.data);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error downloading student",
      error,
    });
  }
};

const updateStudent = async (req: Request, res: Response) => {
  try {
    const { student_id } = req.query;
    const student = await studentService.updateStudent(
      student_id as string,
      req.body
    );
    res.status(student.statusCode).json(student);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error updating student",
      error,
    });
  }
};

export default {
  addStudent,
  getStudents,
  bulkAddStudents,
  downloadStudent,
  updateStudent,
};
