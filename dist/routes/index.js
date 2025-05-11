"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth.route"));
const express_1 = __importDefault(require("express"));
const student_route_1 = __importDefault(require("./student.route"));
const vaccinationDrive_route_1 = __importDefault(require("./vaccinationDrive.route"));
const router = express_1.default.Router();
const routes = [
    {
        path: "/auth",
        route: auth_route_1.default,
    },
    {
        path: "/student",
        route: student_route_1.default,
    },
    {
        path: "/vaccination-drive",
        route: vaccinationDrive_route_1.default,
    },
];
routes.forEach((obj) => {
    router.use(obj.path, obj.route);
});
exports.default = router;
//# sourceMappingURL=index.js.map