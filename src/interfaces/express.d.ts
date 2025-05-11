// src/interfaces/express.d.ts

import { CurrentUserDto } from "./user.interface";

declare module "express-serve-static-core" {
  interface Request {
    user?: CurrentUserDto;
  }
}
