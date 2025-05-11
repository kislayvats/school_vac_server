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
const auth_service_1 = __importDefault(require("../services/auth.service"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const user = yield auth_service_1.default.registerUser({ name, email, password });
        res.status(user.statusCode).json(user);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Error registering user",
            error,
        });
        throw new Error("Error registering user");
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield auth_service_1.default.loginUser({ email, password });
        res.status(user.statusCode).json(user);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Error logging in",
            error,
        });
        throw new Error("Error logging in");
    }
});
const currentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_service_1.default.currentUser(req.cookies.user._id);
        res.status(user.statusCode).json(user);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Error fetching current user",
            error,
        });
        throw new Error("Error fetching current user");
    }
});
exports.default = {
    registerUser,
    loginUser,
    currentUser,
};
//# sourceMappingURL=auth.controller.js.map