import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import User from './user.model.js';
import usersService from './user.service.js';

const userRouter = (fastify, options, done) => {
  fastify.get('/', async (req, reply) => {
    const users = await usersService.getAll();
    reply.code(StatusCodes.OK).send(users.map(User.toResponse));
  });

  fastify.post('/', async (req, reply) => {
    const { name, login, password } = req.body;
    const user = new User({ name, login, password });
    await usersService.createUser(user);
    reply.code(StatusCodes.CREATED).send(User.toResponse(user));
  });

  fastify.get('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const user = await usersService.getUserById(id);
      reply.code(StatusCodes.OK).send(User.toResponse(user));
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
  });

  fastify.put('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const user = await usersService.updateUser(id, req.body);
      reply.code(StatusCodes.OK).send(User.toResponse(user));
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
  });

  fastify.delete('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      await usersService.deleteUser(id);
      reply.code(StatusCodes.NO_CONTENT);
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
  });

  done();
};

export default userRouter;
