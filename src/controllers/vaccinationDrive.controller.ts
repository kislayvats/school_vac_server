import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import vaccinationDriveService from "../services/vaccinationDrive.service";
import { VaccinationDriveDto } from "../interfaces/vaccinationDrive.interface";
import { VaccinationDriveStatus } from "../enum/user.enum";
import { ResponseDto } from "../dto/response.dto";
import {
  StudentResponse,
  StudentResponseDto,
} from "../interfaces/student.interface";
import { StudentDocument } from "../schemas/models/student.model";

const createVaccinationDrive = async (req: Request, res: Response) => {
  try {
    const vaccinationDrive: VaccinationDriveDto = req.body;
    console.log(vaccinationDrive);
    const vaccinationDriveResponse =
      await vaccinationDriveService.createVaccinationDrive(vaccinationDrive);
    res
      .status(vaccinationDriveResponse.statusCode)
      .json(vaccinationDriveResponse);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error creating vaccination drive",
      error,
    });
  }
};

const getVaccinationDrives = async (req: Request, res: Response) => {
  try {
    const { page, limit, search } = req.query;
    const vaccinationDrives =
      await vaccinationDriveService.getVaccinationDrives({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
      });
    res.status(vaccinationDrives.statusCode).json(vaccinationDrives);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error getting vaccination drives",
      error,
    });
  }
};

const getVaccinationDriveStudentsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page, limit, status } = req.query;
    let vaccinationDrive: ResponseDto<
      StudentResponse<StudentDocument<Partial<StudentResponseDto>>[]>
    >;
    if (status === VaccinationDriveStatus.COMPLETED) {
      vaccinationDrive =
        await vaccinationDriveService.getVaccinationDriveCompletedStudentsById(
          id,
          { page: Number(page), limit: Number(limit) }
        );
      res.status(vaccinationDrive.statusCode).json(vaccinationDrive);
    } else {
      vaccinationDrive =
        await vaccinationDriveService.getVaccinationDriveStudentsById(id, {
          page: Number(page),
          limit: Number(limit),
        });
    }
    res.status(vaccinationDrive.statusCode).json(vaccinationDrive);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error getting vaccination drive by id",
      error,
    });
  }
};

const updateVaccinationDriveById = async (req: Request, res: Response) => {
  try {
    const { vaccination_drive_id } = req.query;
    const vaccinationDrive =
      await vaccinationDriveService.updateVaccinationDriveById(
        vaccination_drive_id as string,
        req.body
      );
    res.status(vaccinationDrive.statusCode).json(vaccinationDrive);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error updating vaccination drive by id",
      error,
    });
  }
};

const getVaccinationStatistics = async (req: Request, res: Response) => {
  try {
    const vaccinationStatistics =
      await vaccinationDriveService.getVaccinationStatistics();
    res.status(vaccinationStatistics.statusCode).json(vaccinationStatistics);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error getting vaccination statistics",
      error,
    });
  }
};

const updateStudentVaccinationDrive = async (req: Request, res: Response) => {
  try {
    const { student_id, vaccination_drive_id } = req.body;
    const vaccinationDrive =
      await vaccinationDriveService.updateStudentVaccinationDrive(
        student_id as string,
        vaccination_drive_id as string
      );
    res.status(vaccinationDrive.statusCode).json(vaccinationDrive);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error updating student vaccination drive",
      error,
    });
  }
};

const getVaccinationDriveStatistics = async (req: Request, res: Response) => {
  try {
    const { vaccination_drive_id } = req.query;
    const vaccinationDriveStatistics =
      await vaccinationDriveService.getVaccinationDriveStatistics(
        vaccination_drive_id as string
      );
    res
      .status(vaccinationDriveStatistics.statusCode)
      .json(vaccinationDriveStatistics);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error getting vaccination drive statistics",
      error,
    });
  }
};

export default {
  createVaccinationDrive,
  getVaccinationDrives,
  getVaccinationDriveStudentsById,
  updateVaccinationDriveById,
  getVaccinationStatistics,
  updateStudentVaccinationDrive,
  getVaccinationDriveStatistics,
};
