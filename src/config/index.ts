import path from "path";
import dotenv from "dotenv";
import Joi from "joi";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000),
    DB_URL: Joi.string().required(),
    APP_MODE: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error)
  throw new Error(`Environment vars validation error: ${error.message}`);

export default {
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
