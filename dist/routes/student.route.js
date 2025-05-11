"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
const student_controller_1 = __importDefault(require("../controllers/student.controller"));
const upload_middleware_1 = require("../middlewares/upload.middleware");
const router = (0, express_1.Router)();
router.post("/add", auth_middlewares_1.default.authCheck, student_controller_1.default.addStudent);
router.get("/", auth_middlewares_1.default.authCheck, student_controller_1.default.getStudents);
router.put("/update", auth_middlewares_1.default.authCheck, student_controller_1.default.updateStudent);
router.post("/bulk-add", auth_middlewares_1.default.authCheck, upload_middleware_1.upload.single("file"), student_controller_1.default.bulkAddStudents);
router.get("/download", student_controller_1.default.downloadStudent);
exports.default = router;
//# sourceMappingURL=student.route.js.map