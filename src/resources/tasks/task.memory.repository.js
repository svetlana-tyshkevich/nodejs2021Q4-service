let taskDB = require('../../common/db.js').tasks;

const getAll = async (boardId) => {
  const tasks = taskDB.filter((task) => task.boardId === boardId);
  return tasks;
};

const createTask = async (task) => {
  taskDB.push(task);

  return task;
};

const getTaskByID = async (boardId, taskId) => {
  const task = taskDB.find(
    (item) => item.boardId === boardId && item.id === taskId
  );
  if (!task) throw Error('error');
  return task;
};

const updateTask = async (boardId, id, taskBody) => {
  const currentIndex = taskDB.findIndex((item) => item.id === id);
  taskDB[currentIndex] = { ...taskBody };
  return taskDB[currentIndex];
};

const deleteTask = async (boardId, taskId) => {
  const currentIndex = [...taskDB].findIndex(
    (item) => item && item.id === taskId
  );
  if (currentIndex === -1) throw Error('error');
  const currentItem = taskDB[currentIndex];
  taskDB.splice(currentIndex, 1);
  return currentItem;
};

const deleteBoardTasks = async (boardId) => {
  taskDB = taskDB.filter((item) => item.boardId !== boardId);
};

const deleteUserTasks = async (userId) => {
  taskDB
    .filter((item) => item.userId === userId)
    .forEach((item) => {
      const copy = item;
      copy.userId = null;
      return copy;
    });
};

module.exports = {
  getAll,
  createTask,
  getTaskByID,
  deleteTask,
  updateTask,
  deleteBoardTasks,
  deleteUserTasks,
};
