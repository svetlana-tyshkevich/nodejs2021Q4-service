import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { FastifyPluginCallback } from 'fastify';
import User from './user.model';
import usersService from './user.service';
import { IUser } from '../../types/interface-types';
import logger from '../../middlewares/logger';

interface IBody {
  Body: {
    name: string;
    login: string;
    password: string;
  };
}

interface IParams {
  Params: {
    id: string;
  };
}

const userRouter: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.get('/', async (_req, reply) => {
    const users = await usersService.getAll();
    reply.code(StatusCodes.OK).send(users.map(User.toResponse));
  });

  fastify.post<IBody>('/', async (req, reply) => {
    const { name, login, password } = req.body;
    const user = new User({ name, login, password });
    await usersService.createUser(user);
    reply.code(StatusCodes.CREATED).send(User.toResponse(user));
  });

  fastify.get<IParams>('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const user = await usersService.getUserById(id);
      reply.code(StatusCodes.OK).send(User.toResponse(user));
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      logger.warn(`User id: ${id} not found`);
    }
  });

  fastify.put<IBody & IParams>('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const user: IUser | undefined = await usersService.updateUser(
        id,
        req.body
      );
      if (user) reply.code(StatusCodes.OK).send(User.toResponse(user));
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      logger.warn(`User id: ${id} not found`);
    }
  });

  fastify.delete<IParams>('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      await usersService.deleteUser(id);
      reply.code(StatusCodes.NO_CONTENT);
    } catch (error) {
      reply.code(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      logger.warn(`User id: ${id} not found`);
    }
  });
  done();
};

export default userRouter;
