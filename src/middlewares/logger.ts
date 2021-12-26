import pino from 'pino';

const logger = pino({
  serializers: {
    req(req) {
      req.body = req.raw.body;
      return {
        method: req.method,
        url: req.url,
        body: req.params,
        queryParams: req.query

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
        //   messageFormat:
        //     '{msg} {req.method} {req.url} {req.parameters)} {res.statusCode}',
        },
        level: 'info',
      },
    ],
  },
});

export default logger;
