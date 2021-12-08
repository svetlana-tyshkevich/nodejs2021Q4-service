import { PORT } from './common/config.js';
import app from './app.js';

const start = async () => {
  try {
    await app.listen(PORT);
    console.log(`Server is running on port ${PORT}`)
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
