interface UserType {
  name: string;
  student_id: string;
  email: string;
  password: string;
}
interface UserLoginDto {
  email: string;
  password: string;
}

interface UserLoginResponseDto extends UserType {
  token: string;
}

interface CurrentUserDto {
  _id: string;
  email: string;
  name: string;
  student_id: string;
}

interface UserRegisterDto {
  name: string;
  email: string;
  password: string;
}

export type {
  UserType,
  UserLoginDto,
  UserLoginResponseDto,
  UserRegisterDto,
  CurrentUserDto,
};
