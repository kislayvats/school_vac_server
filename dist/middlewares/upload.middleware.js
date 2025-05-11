"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
// src/middleware/upload.middleware.ts
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage(); // or diskStorage if saving files
exports.upload = (0, multer_1.default)({ storage });
//# sourceMappingURL=upload.middleware.js.map