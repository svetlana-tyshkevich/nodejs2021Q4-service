import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import Board from './board.model.js';
import boardsService from './board.service.js';

const boardRouter = (fastify, options, done) => {
  fastify.get('/', async (req, reply) => {
    const boards = await boardsService.getAll();
    reply.code(StatusCodes.OK).send(boards);
  });

  fastify.post('/', async (req, reply) => {
    const { title, columns } = req.body;
    const board = new Board({ title, columns });
    await boardsService.createBoard(board);
    reply.code(StatusCodes.CREATED).send(board);
  });

  fastify.get('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const board = await boardsService.getBoardById(id);
      reply.code(StatusCodes.OK).send(board);
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
  });

  fastify.put('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const board = await boardsService.updateBoard(id, req.body);
      reply.code(StatusCodes.OK).send(board);
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
  });

  fastify.delete('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      await boardsService.deleteBoard(id);
      reply.code(StatusCodes.NO_CONTENT);
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
  });

  done();
};

export default boardRouter;
