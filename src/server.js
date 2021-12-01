const { PORT } = require('./common/config');
const fastify = require('./app');

const start = async () => {
  try {
    await fastify.listen(PORT);
    console.log(`Server is running on port ${PORT}`)
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
