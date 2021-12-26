import { PORT } from './common/config';
import app from './app';
import logger from './middlewares/logger';

/**
 * Starts server
 * @param PORT - port for app
 */
const start = async () => {
  try {
    await app.listen(PORT);
    logger.info(`Server is running on port ${PORT}`)
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};
start();
