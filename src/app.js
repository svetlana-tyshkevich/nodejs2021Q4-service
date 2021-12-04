const fastify = require('fastify')();
// const path = require('path');
// const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');

// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

fastify.register(userRouter, { prefix: '/users' });
fastify.register(boardRouter, { prefix: '/boards' });

module.exports = fastify;
