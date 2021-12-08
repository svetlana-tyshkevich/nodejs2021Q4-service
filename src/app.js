import fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import userRouter from './resources/users/user.router.js';
import boardRouter from './resources/boards/board.router.js';
import taskRouter from './resources/tasks/task.router.js';

const app = fastify();

const dirnameCustom = dirname(fileURLToPath(import.meta.url));


app.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: join(dirnameCustom, '../doc/api.yaml'),
  },
});

app.register(userRouter, { prefix: '/users' });
app.register(boardRouter, { prefix: '/boards' });
app.register(taskRouter, { prefix: '/boards/:boardId/tasks' });


export default app;
