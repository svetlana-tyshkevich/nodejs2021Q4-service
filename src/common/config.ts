import dotenv from 'dotenv';
import path from 'path';

declare let process: {
  env: {
    PORT: number;
    NODE_ENV: string;
    MONGO_CONNECTION_STRING: string;
    JWT_SECRET_KEY: string;
    AUTH_MODE: boolean;
    LOG_LEVEL: string;
  };
};

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const { PORT } = process.env;
export const { NODE_ENV } = process.env;
export const { MONGO_CONNECTION_STRING } = process.env;
export const { JWT_SECRET_KEY } = process.env;
export const { AUTH_MODE } = process.env;
export const { LOG_LEVEL  } = process.env;


