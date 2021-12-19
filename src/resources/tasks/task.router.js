const Task = require('./task.model');
const tasksService = require('./task.service');

const taskRouter = (fastify, options, done) => {
  fastify.get('/', async (req, reply) => {
    const { boardId } = req.params;
    try {
      const tasks = await tasksService.getAll(boardId);
      reply.code(200).send(tasks);
    } catch (error) {
      reply.sendStatus(404).send('This board is not found');
    }
  });

  fastify.post('/', async (req, reply) => {
    try {
      const { boardId } = req.params;
      const taskBody = req.body;

      const task = new Task({ ...taskBody, boardId });
      await tasksService.createTask(task);
      reply.status(201).send(task);
    } catch (e) {
      reply.sendStatus(401);
    }
  });

  fastify.get('/:id', async (req, reply) => {
    const { boardId, id } = req.params;
    try {
      const task = await tasksService.getTaskByID(boardId, id);
      reply.code(200).send(task);
    } catch (error) {
      reply.code(404).send('Task is not found');
    }
  });

  fastify.put('/:id', async (req, reply) => {
    const { boardId, id } = req.params;
    try {
      const task = await tasksService.updateTask(boardId, id, req.body);
      reply.code(200).send(task);
    } catch (error) {
      reply.code(404).send('Task is not found');
    }
  });

  fastify.delete('/:id', async (req, reply) => {
    const { boardId, id } = req.params;
    try {
      await tasksService.deleteTask(boardId, id);
      reply.code(204);
    } catch (error) {
      reply.code(404).send('Task is not found');
    }
  });

  done();
};

module.exports = taskRouter;
