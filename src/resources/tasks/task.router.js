import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import Task from './task.model.js';
import tasksService from './task.service.js';

const taskRouter = (fastify, options, done) => {
  fastify.get('/', async (req, reply) => {
    const { boardId } = req.params;
    try {
      const tasks = await tasksService.getAll(boardId);
      reply.code(StatusCodes.OK).send(tasks);
    } catch (error) {
      reply.sendStatus(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
  });

  fastify.post('/', async (req, reply) => {
    try {
      const { boardId } = req.params;
      const taskBody = req.body;

      const task = new Task({ ...taskBody, boardId });
      await tasksService.createTask(task);
      reply.status(StatusCodes.CREATED).send(task);
    } catch (e) {
      reply.sendStatus(StatusCodes.UNAUTHORIZED);
    }
  });

  fastify.get('/:id', async (req, reply) => {
    const { boardId, id } = req.params;
    try {
      const task = await tasksService.getTaskByID(boardId, id);
      reply.code(StatusCodes.OK).send(task);
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
  });

  fastify.put('/:id', async (req, reply) => {
    const { boardId, id } = req.params;
    try {
      const task = await tasksService.updateTask(boardId, id, req.body);
      reply.code(StatusCodes.OK).send(task);
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
  });

  fastify.delete('/:id', async (req, reply) => {
    const { boardId, id } = req.params;
    try {
      await tasksService.deleteTask(boardId, id);
      reply.code(StatusCodes.NO_CONTENT);
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
  });

  done();
};

export default taskRouter;
