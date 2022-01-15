import 'reflect-metadata';
import { createConnection } from 'typeorm';
import {
  PORT,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
} from './common/config';
import app from './app';
import logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';


errorHandler(app);

createConnection({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ['src/entity/**/*{.ts,.js}'],
  synchronize: true,
  logging: false,
})
  .then(async (connection) => {
    if (connection.isConnected) {
      console.log('DataBase is connected');

      await app.listen(PORT, '0.0.0.0');
      console.log(`Server is running on port ${PORT}`);
    } else {
      connection.connect();
    }
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });

// const start = async () => {
//   try {
//     await app.listen(PORT, '0.0.0.0');
//     console.log(`Server is running on port ${PORT}`);
//   } catch (err) {
//     logger.error(err);
//     process.exit(1);
//   }
// };
// start();