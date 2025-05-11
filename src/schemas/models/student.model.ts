import { Document } from "mongoose";
import { StudentResponseDto } from "../../interfaces/student.interface";

export interface StudentDocument<T = StudentResponseDto> extends Document<T> {}
