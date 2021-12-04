
const Board = require('./board.model');
const boardsService = require('./board.service');

const boardRouter = (fastify, options, done) => {
  fastify.get('/', async (req, reply) => {
    const boards = await boardsService.getAll();
    reply.code(200).send(boards);
  });

  fastify.post('/', async (req, reply) => {
    const { title, columns } = req.body;
    const board = new Board({ title, columns });
    await boardsService.createBoard(board);
    reply.code(201).send(board);
  });

  fastify.get('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const board = await boardsService.getBoardById(id);
      reply.code(200).send(board);
    } catch (error) {
      reply.code(404).send('Board is not found');
    }
  });

  fastify.put('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const board = await boardsService.updateBoard(id, req.body);
      reply.code(200).send(board);
    } catch (error) {
      reply.code(404).send('Board is not found');
    }
  });

  fastify.delete('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      await boardsService.deleteBoard(id);
      reply.code(204);
    } catch (error) {
      reply.code(404).send('Board is not found');
    }
  });

  done();
};

module.exports = boardRouter;

