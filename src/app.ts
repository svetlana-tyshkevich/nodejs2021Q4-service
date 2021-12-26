import fastify from 'fastify';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import logger from './middlewares/logger';



const app = fastify({
    logger
//   logger: {
//     prettyPrint: {
//       translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
//       ignore: 'pid,hostname,reqId,responseTime,req,res',
//       messageFormat: '{msg} {req.method} {req.url} {res.statusCode} {req.body}',
//     },
//   },
});

app.register(userRouter, { prefix: '/users' });
app.register(boardRouter, { prefix: '/boards' });
app.register(taskRouter, { prefix: '/boards/:boardId/tasks' });

export default app;
