"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const _1 = __importDefault(require("."));
const routes_1 = __importDefault(require("../routes"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
exports.default = (app) => {
    app.use((0, morgan_1.default)("dev"));
    app.use((0, cors_1.default)({ path: "*" }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use(`/${_1.default.version.appMode}`, routes_1.default);
    app.use((err, req, res, next) => {
        const { statusCode = http_status_codes_1.default.BAD_REQUEST, message = "Bad Request!!!", } = err;
        res.status(statusCode).json({ message, success: false });
    });
};
//# sourceMappingURL=express.config.js.map