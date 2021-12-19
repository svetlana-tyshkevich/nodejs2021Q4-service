const fastify = require('fastify')();
const fastifySwagger = require('fastify-swagger');
const path = require('path');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

fastify.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
});

fastify.register(userRouter, { prefix: '/users' });
fastify.register(boardRouter, { prefix: '/boards' });
fastify.register(taskRouter, { prefix: '/boards/:boardId/tasks' });


module.exports = fastify;
