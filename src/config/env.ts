import "dotenv/config";
import * as joi from "joi";

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  API_VERSION: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    API_VERSION: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validations error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  apiVersion: envVars.API_VERSION,
};
