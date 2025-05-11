"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
const envVarsSchema = joi_1.default.object()
    .keys({
    PORT: joi_1.default.number().default(3000),
    DB_URL: joi_1.default.string().required(),
    APP_MODE: joi_1.default.string().required(),
})
    .unknown();
const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);
if (error)
    throw new Error(`Environment vars validation error: ${error.message}`);
exports.default = {
    port: envVars.PORT,
    mongoose: {
        url: envVars.DB_URL,
        options: {},
    },
    version: {
        appMode: envVars.APP_MODE,
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        expiresIn: envVars.JWT_EXPIRES_IN,
    },
};
//# sourceMappingURL=index.js.map