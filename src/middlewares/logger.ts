import pino from 'pino';
import path from 'path';
// import { LOG_LEVEL } from '../common/config'


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
        level: 'info',
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
