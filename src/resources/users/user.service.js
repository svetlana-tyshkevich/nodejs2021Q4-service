const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const createUser = (user) => usersRepo.createUser(user);

module.exports = { getAll, createUser };
