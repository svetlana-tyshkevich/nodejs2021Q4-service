import pino, { Level } from 'pino';
import path from 'path';
import { LOG_LEVEL } from '../common/config';

const levels = (envLevel: string) => {
  switch (envLevel) {
    case '0':
      return 'error';
    case '1':
      return 'warn';
    case '2':
      return 'info';
    case '3':
      return 'debug';
    case '4':
      return 'all';
    default:
      return 'all';
  }
};

const logger = pino({
  serializers: {
    req(req) {
      req.body = req.raw.body;
      return {
        method: req.method,
        url: req.url,
        body: req.params,
        queryParams: req.query,
      };
    },
  },

  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
          ignore: 'pid,hostname,reqId,responseTime',
          destination: path.join(__dirname, '../logging/common.log'),
        },
        level: levels(LOG_LEVEL) as Level,
      },
      {
        target: 'pino-pretty',
        options: {
          translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
          ignore: 'pid,hostname,reqId,responseTime',
          destination: path.join(__dirname, '../logging/errors.log'),
        },
        level: 'error',
      },
    ],
  },
});

export default logger;
