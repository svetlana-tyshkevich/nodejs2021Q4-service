import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const dirnameCustom = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(dirnameCustom, '../../.env'),
});

export const { PORT } = process.env;
export const { NODE_ENV } = process.env;
export const { MONGO_CONNECTION_STRING } = process.env;
export const { JWT_SECRET_KEY } = process.env;
export const { AUTH_MODE } = process.env;
