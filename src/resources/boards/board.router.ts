import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { FastifyPluginCallback } from 'fastify';
import Board from '../../entity/board.model';
import boardsService from './board.service';
import { IColumn } from '../../types/interface-types';
import logger from '../../middlewares/logger';

interface IBody {
  Body: {
    title: string;
    columns?: IColumn[] | null | undefined;
  };
}

interface IParams {
  Params: {
    id: string;
  };
}

const boardRouter: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.get('/', async (_req, reply) => {
    const boards = await boardsService.getAll();
    reply.code(StatusCodes.OK).send(boards);
  });

  fastify.post<IBody>('/', async (req, reply) => {
    const { title, columns } = req.body;
    const board = new Board({ title, columns });
    await boardsService.createBoard(board);
    reply.code(StatusCodes.CREATED).send(board);
  });

  fastify.get<IParams>('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const board = await boardsService.getBoardById(id);
      reply.code(StatusCodes.OK).send(board);
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      logger.warn(`Board id: ${id} not found`);
    }
  });

  fastify.put<IBody & IParams>('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const board = await boardsService.updateBoard(id, req.body);
      reply.code(StatusCodes.OK).send(board);
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      logger.warn(`Board id: ${id} not found`);
    }
  });

  fastify.delete<IParams>('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      await boardsService.deleteBoard(id);
      reply.code(StatusCodes.NO_CONTENT);
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      logger.warn(`Board id: ${id} not found`);
    }
  });

  done();
};

export default boardRouter;
