import { PORT } from './common/config';
import app from './app';
import logger from './middlewares/logger';

process.on('uncaughtException', (err, origin) => {
  logger.error(err.message, origin);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection, reason: ${reason}`);
  setTimeout(() => {
    process.exit(1);
  }, 500);
});

// Promise.reject(Error('Oops!'));
// throw Error('Oops!');

/**
 * Starts server
 * @param PORT - port for app
 */
const start = async () => {
  try {
    await app.listen(PORT);
    console.log(`Server is running on port ${PORT}`)
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};
start();
