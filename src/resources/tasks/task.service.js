const tasksRepo = require('./task.memory.repository');

const getAll = (boardId) => tasksRepo.getAll(boardId);

const createTask = (task) => tasksRepo.createTask(task);

const getTaskByID = (boardId, taskId) => tasksRepo.getTaskByID(boardId, taskId);

const updateTask = (boardId, id, taskBody) =>
  tasksRepo.updateTask(boardId, id, taskBody);

const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

const deleteBoardTasks = (boardId) => tasksRepo.deleteBoardTasks(boardId);

const deleteUserTasks = (userId) => tasksRepo.deleteUserTasks(userId);

module.exports = {
  getAll,
  createTask,
  getTaskByID,
  deleteTask,
  updateTask,
  deleteBoardTasks,
  deleteUserTasks,
};
