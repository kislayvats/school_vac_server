"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.default.registerUser);
router.post("/login", auth_controller_1.default.loginUser);
router.get("/current-user", auth_middlewares_1.default.authCheck, auth_controller_1.default.currentUser);
exports.default = router;
//# sourceMappingURL=auth.route.js.map