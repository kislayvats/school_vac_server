import { Document } from "mongoose";
import { ResponseDto } from "../dto/response.dto";
import {
  VaccinationDriveDto,
  VaccinationDriveResponse,
} from "../interfaces/vaccinationDrive.interface";
import VaccinationDrive from "../schemas/vaccinationdrive.schema";
import HttpStatus from "http-status-codes";
import { FilterQuery } from "../interfaces/filterQuery.interface";
import Student from "../schemas/student.schema";
import {
  StudentResponse,
  StudentResponseDto,
} from "../interfaces/student.interface";
import { StudentDocument } from "../schemas/models/student.model";
const createVaccinationDrive = async ({
  vaccine_name,
  drive_date,
  available_doses,
  applicable_classes,
}: VaccinationDriveDto): Promise<
  ResponseDto<Document<Partial<VaccinationDriveDto>>>
> => {
  const vaccinationDrive = await VaccinationDrive.create({
    vaccine_name,
    drive_date,
    available_doses,
    applicable_classes,
  });
  return new ResponseDto(
    HttpStatus.CREATED,
    "Vaccination drive created successfully",
    vaccinationDrive
  );
};

const getVaccinationDrives = async (
  query: FilterQuery
): Promise<
  ResponseDto<
    VaccinationDriveResponse<Document<Partial<VaccinationDriveDto>>[]>
  >
> => {
  const { page, limit } = query;
  const skip = (page - 1) * limit;
  let searchQuery = {};
  if (query.search) {
    searchQuery = {
      $or: [{ vaccine_name: { $regex: query.search, $options: "i" } }],
    };
  }
  const vaccination_drives = await VaccinationDrive.find(searchQuery)
    .skip(skip)
    .limit(limit);
  const totalCounts = await VaccinationDrive.countDocuments(searchQuery);
  return new ResponseDto(
    HttpStatus.OK,
    "Vaccination drives fetched successfully",
    {
      vaccination_drives,
      totalCounts,
      totalPages: Math.ceil(totalCounts / limit),
    }
  );
};

const getVaccinationDriveStudentsById = async (
  id: string,
  query: FilterQuery
): Promise<
  ResponseDto<StudentResponse<StudentDocument<Partial<StudentResponseDto>>[]>>
> => {
  const vaccinationDrive = await VaccinationDrive.findById(id);
  const { page, limit } = query;
  const skip = (page - 1) * limit;
  const students = await Student.find({
    class: { $in: vaccinationDrive.applicable_classes },
  })
    .skip(skip)
    .limit(limit);
  const totalCounts = await Student.countDocuments({
    class: { $in: vaccinationDrive.applicable_classes },
  });
  if (!vaccinationDrive) {
    return new ResponseDto(
      HttpStatus.NOT_FOUND,
      "Vaccination drive not found",
      null
    );
  }
  return new ResponseDto(
    HttpStatus.OK,
    "Vaccination drive fetched successfully",
    {
      vaccination_drive: vaccinationDrive,
      students,
      totalCounts,
      totalPages: Math.ceil(totalCounts / limit),
    }
  );
};

const getVaccinationDriveCompletedStudentsById = async (
  id: string,
  query: FilterQuery
): Promise<
  ResponseDto<StudentResponse<StudentDocument<Partial<StudentResponseDto>>[]>>
> => {
  const { page, limit } = query;
  const skip = (page - 1) * limit;
  const students = await Student.find({
    vaccination_drives: { $in: [id] },
  })
    .skip(skip)
    .limit(limit);
  const totalCounts = await Student.countDocuments({
    vaccination_drives: { $in: [id] },
  });
  return new ResponseDto(
    HttpStatus.OK,
    "Vaccination drive fetched successfully",
    {
      students,
      totalCounts,
      totalPages: Math.ceil(totalCounts / limit),
    }
  );
};

const updateVaccinationDriveById = async (
  id: string,
  body: Partial<VaccinationDriveDto>
): Promise<ResponseDto<Document<Partial<VaccinationDriveDto>>>> => {
  const vaccinationDrive = await VaccinationDrive.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!vaccinationDrive) {
    return new ResponseDto(
      HttpStatus.NOT_FOUND,
      "Vaccination drive not found",
      null
    );
  }
  return new ResponseDto(
    HttpStatus.OK,
    "Vaccination drive updated successfully",
    vaccinationDrive
  );
};

const getVaccinationStatistics = async (): Promise<ResponseDto<any>> => {
  // Get total number of students
  const totalStudents = await Student.countDocuments();

  // Get number of students with at least one vaccination
  const vaccinatedStudents = await Student.countDocuments({
    vaccination_drives: { $exists: true, $ne: [] },
  });

  // Calculate vaccination percentage
  const vaccinationPercentage = (vaccinatedStudents / totalStudents) * 100;

  // Get upcoming vaccination drives in next 30 days
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  const upcomingDrives = await VaccinationDrive.find({
    drive_date: {
      $gte: new Date(),
      $lte: thirtyDaysFromNow,
    },
  }).sort({ drive_date: 1 });

  return new ResponseDto(
    HttpStatus.OK,
    "Vaccination statistics fetched successfully",
    {
      totalStudents,
      vaccinatedStudents,
      vaccinationPercentage: Math.round(vaccinationPercentage * 100) / 100,
      upcomingDrives,
    }
  );
};

const getVaccinationDriveStatistics = async (
  driveId: string
): Promise<ResponseDto<any>> => {
  // Get total number of students
  const totalStudents = await Student.countDocuments();

  // Get number of students with at least one vaccination
  const vaccinatedStudents = await Student.countDocuments({
    vaccination_drives: { $in: [driveId] },
  });
  const vaccinationDrive = await VaccinationDrive.findById(driveId);
  // Calculate vaccination percentage
  const vaccinationPercentage = (vaccinatedStudents / totalStudents) * 100;

  return new ResponseDto(
    HttpStatus.OK,
    "Vaccination statistics fetched successfully",
    {
      vaccinationDrive,
      totalStudents,
      vaccinatedStudents,
      notVaccinatedStudents: totalStudents - vaccinatedStudents,
      vaccinationPercentage: Math.round(vaccinationPercentage * 100) / 100,
    }
  );
};

const updateStudentVaccinationDrive = async (
  studentId: string,
  vaccinationDriveId: string
): Promise<ResponseDto<any>> => {
  const student = await Student.findByIdAndUpdate(studentId, {
    $push: {
      vaccination_drives: vaccinationDriveId,
    },
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
  createVaccinationDrive,
  getVaccinationDrives,
  getVaccinationDriveStudentsById,
  getVaccinationDriveCompletedStudentsById,
  updateVaccinationDriveById,
  getVaccinationStatistics,
  updateStudentVaccinationDrive,
  getVaccinationDriveStatistics,
};
