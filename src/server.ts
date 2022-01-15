import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { PORT } from './common/config';
import app from './app';
import logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import dbConfig from './common/ormconfig'

errorHandler(app);

createConnection(dbConfig)
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
