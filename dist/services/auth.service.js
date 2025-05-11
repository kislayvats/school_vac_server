"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const response_dto_1 = require("../dto/response.dto");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const registerUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = body;
    console.log(body);
    const saltRounds = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    const user = yield user_schema_1.default.create({
        name,
        email,
        password: hashedPassword,
    });
    return new response_dto_1.ResponseDto(http_status_codes_1.default.CREATED, "User registered successfully", user);
});
const loginUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(body);
    const { email, password } = body;
    const user = yield user_schema_1.default.findOne({ email }).lean();
    console.log(user);
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    console.log(isMatch);
    if (!user) {
        return new response_dto_1.ResponseDto(http_status_codes_1.default.NOT_FOUND, "User not found", null);
    }
    if (!isMatch) {
        return new response_dto_1.ResponseDto(http_status_codes_1.default.UNAUTHORIZED, "Invalid password", null);
    }
    const userPayload = {
        _id: user._id,
        email: user.email,
        name: user.name,
    };
    const token = jsonwebtoken_1.default.sign(userPayload, config_1.default.jwt.secret);
    return new response_dto_1.ResponseDto(http_status_codes_1.default.OK, "User logged in successfully", {
        user,
        token,
    });
});
const currentUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_schema_1.default.findById(userId);
    return new response_dto_1.ResponseDto(http_status_codes_1.default.OK, "User fetched successfully", user);
});
exports.default = {
    registerUser,
    loginUser,
    currentUser,
};
//# sourceMappingURL=auth.service.js.map