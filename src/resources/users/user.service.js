import usersRepo from './user.memory.repository.js';
import  tasksRepo from '../tasks/task.service.js';

const getAll = () => usersRepo.getAll();

const getUserById = (id) => usersRepo.getUserById(id);

const createUser = (user) => usersRepo.createUser(user);

const updateUser = (id, userInfo) => usersRepo.updateUser(id, userInfo);

const deleteUser = (id) => {
  tasksRepo.deleteUserTasks(id);
  usersRepo.deleteUser(id);
};

export default { getAll, getUserById, createUser, updateUser, deleteUser };
