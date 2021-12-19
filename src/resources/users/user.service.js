const usersRepo = require('./user.memory.repository');
const { deleteUserTasks } = require('../tasks/task.service.js');

const getAll = () => usersRepo.getAll();

const getUserById = (id) => usersRepo.getUserById(id);

const createUser = (user) => usersRepo.createUser(user);

const updateUser = (id, userInfo) => usersRepo.updateUser(id, userInfo);

const deleteUser = (id) => {
  deleteUserTasks(id);
  usersRepo.deleteUser(id);
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
