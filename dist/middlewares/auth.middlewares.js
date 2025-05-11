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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const authCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        console.log(token);
        if (!token) {
            console.log("Unauthorized");
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
        req.cookies = {
            user: decoded,
        };
        console.log(req.cookies);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(http_status_codes_1.default.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
});
exports.default = {
    authCheck,
};
//# sourceMappingURL=auth.middlewares.js.map