import { VaccinationDriveDto } from "./vaccinationDrive.interface";

interface StudentRegisterDto {
  name: string;
  email: string;

  class: string;
  mobile_number: string;
}

interface StudentResponseDto {
  student_id: string;
  name: string;
  email: string;
  class: string;
  mobile_number: string;
  vaccination_drives?: VaccinationDriveDto[];
}

interface StudentFile {
  file: Express.Multer.File;
}

export type StudentResponse<T> = {
  students: T;
};

export type { StudentRegisterDto, StudentResponseDto, StudentFile };
