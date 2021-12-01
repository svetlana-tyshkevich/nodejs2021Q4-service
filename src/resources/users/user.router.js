
const User = require('./user.model');
const usersService = require('./user.service');

const userRouter = (fastify, options, done) => {
  fastify.get('/users', async (req, reply) => {
    const users = await usersService.getAll();
    reply.code(200).send(users.map(User.toResponse));
  });

  fastify.post('/users', async (req, reply) => {
    const { name, login, password } = req.body;
    const user = new User({ name, login, password });
    await usersService.createUser(user);
    reply.code(201).send(User.toResponse(user));
  });

  fastify.get('/users/:id', async (req, reply) => {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    reply.code(200).send(User.toResponse(user));
  });

  fastify.put('/users/:id', async (req, reply) => {
    const { id } = req.params;
    const user = await usersService.updateUser(id, req.body);
    reply.code(200).send(User.toResponse(user));
  });

  fastify.delete('/users/:id', async (req, reply) => {
    const { id } = req.params;
    await usersService.deleteUser(id);
    reply.code(204);
  });

  done();
};

module.exports = userRouter;
