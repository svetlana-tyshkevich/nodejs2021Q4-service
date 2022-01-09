import { PORT } from './common/config';
import app from './app';
import logger from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';

errorHandler(app);
/**
 * Starts server
 * @param PORT - port for app
 */
const start = async () => {
  try {
    await app.listen(PORT, '0.0.0.0');
    console.log(`Server is running on port ${PORT}`)
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};
start();
