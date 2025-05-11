"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_config_1 = __importDefault(require("./config/mongoose.config"));
const express_config_1 = __importDefault(require("./config/express.config"));
const app = (0, express_1.default)();
const port = 3000;
(0, mongoose_config_1.default)();
(0, express_config_1.default)(app);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map