import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { FastifyInstance } from 'fastify';
import logger from './logger'

const errorHandler = (app: FastifyInstance) => {
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

  app.setNotFoundHandler((req, reply) => {
    logger.warn(`Route ${req.url} not found`);
    reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
  });

  app.setErrorHandler((error, _req, reply) => {
    const { statusCode } = error;
    if (statusCode && statusCode >= 500) {
      logger.error(error);
      reply.code(statusCode).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    } else if (statusCode && statusCode >= 400) {
      logger.warn(error);
      reply.code(statusCode).send(ReasonPhrases.NOT_FOUND);
    } else {
      logger.info(error);
      reply.code(500).send('Service Unavailable');
    }
  });

//   Promise.reject(Error('Oops!'));
  // throw Error('Oops!');
};

export default errorHandler;