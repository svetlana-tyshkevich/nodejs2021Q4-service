import fastify from 'fastify';
import 'reflect-metadata';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import logger from './middlewares/logger';



const app = fastify({
    logger
});

app.register(userRouter, { prefix: '/users' });
app.register(boardRouter, { prefix: '/boards' });
app.register(taskRouter, { prefix: '/boards/:boardId/tasks' });

export default app;
