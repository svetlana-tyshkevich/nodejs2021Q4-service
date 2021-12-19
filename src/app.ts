import fastify from 'fastify';
// import fastifySwagger from 'fastify-swagger';
// import { join } from 'path';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router.js';
import taskRouter from './resources/tasks/task.router.js';

const app = fastify();

// app.register(fastifySwagger, {
//   exposeRoute: true,
//   routePrefix: '/doc',
//   mode: 'static',
//   specification: {
//     path: join(__dirname, '../doc/api.yaml'),
//   },
// });

app.register(userRouter, { prefix: '/users' });
app.register(boardRouter, { prefix: '/boards' });
app.register(taskRouter, { prefix: '/boards/:boardId/tasks' });

export default app;
