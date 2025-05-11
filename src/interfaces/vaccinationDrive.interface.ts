import { VaccinationDriveStatus } from "../enum/user.enum";

interface VaccinationDriveDto {
  vaccine_name: string;
  drive_date: Date;
  available_doses: number;
  applicable_classes: string[];
  status: VaccinationDriveStatus;
}

export type VaccinationDriveResponse<T> = {
  vaccination_drives: T;
};

export type { VaccinationDriveDto };
