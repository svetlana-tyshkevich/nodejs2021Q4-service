import { PORT } from './common/config';
import app from './app';

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
