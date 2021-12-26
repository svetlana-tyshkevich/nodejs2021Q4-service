import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { FastifyPluginCallback } from 'fastify';
import Task from './task.model';
import tasksService from './task.service';
import logger from '../../middlewares/logger';

interface IBody {
  Body: {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string | null;
    columnId: string | null;
  };
}

interface IParams {
  Params: {
    id: string,
    boardId: string;
  };
}

const taskRouter: FastifyPluginCallback = (fastify, _options, done) => {
  fastify.get<IParams>('/', async (req, reply) => {
    const { boardId } = req.params;
    try {
      const tasks = await tasksService.getAll(boardId);
      reply.code(StatusCodes.OK).send(tasks);
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      logger.warn(`Board id: ${boardId} not found`);
    }
  });

  fastify.post<IBody & IParams>('/', async (req, reply) => {
    try {
      const { boardId } = req.params;
      const taskBody = req.body;

      const task = new Task({ ...taskBody, boardId });
      await tasksService.createTask(task);
      reply.status(StatusCodes.CREATED).send(task);
    } catch (e) {
      reply.code(StatusCodes.UNAUTHORIZED);
      logger.warn(`Board not found`);
    }
  });

  fastify.get<IBody & IParams>('/:id', async (req, reply) => {
    const { boardId, id } = req.params;
    try {
      const task = await tasksService.getTaskByID(boardId, id);
      reply.code(StatusCodes.OK).send(task);
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      logger.warn(`Task id: ${id} not found`);
    }
  });

  fastify.put<IBody & IParams>('/:id', async (req, reply) => {
    const { boardId, id } = req.params;
    try {
      const task = await tasksService.updateTask(boardId, id, req.body);
      reply.code(StatusCodes.OK).send(task);
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      logger.warn(`Task id: ${id} not found`);
    }
  });

  fastify.delete<IParams>('/:id', async (req, reply) => {
    const { boardId, id } = req.params;
    try {
      await tasksService.deleteTask(boardId, id);
      reply.code(StatusCodes.NO_CONTENT);
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      logger.warn(`Task id: ${id} not found`);
    }
  });

  done();
};

export default taskRouter;
