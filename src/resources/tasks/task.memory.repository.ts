import db  from '../../common/db';
import { ITask } from '../../types/interface-types';

let taskDB: ITask[] = db.tasks;

const getAll = async (boardId: string): Promise<ITask[]> => {
  const tasks = taskDB.filter((task) => task.boardId === boardId);
  return tasks;
};

const createTask = async (task: ITask): Promise<ITask> => {
  taskDB.push(task);

  return task;
};

const getTaskByID = async (boardId: string, taskId: string): Promise<ITask> => {
  const task = taskDB.find(
    (item) => item.boardId === boardId && item.id === taskId
  );
  if (!task) throw Error('error');
  return task;
};

const updateTask = async (
  _boardId: string,
  id: string,
  taskBody: ITask
): Promise<ITask | undefined> => {
  const currentIndex = taskDB.findIndex((item) => item.id === id);
  taskDB[currentIndex] = { ...taskBody };
  return taskDB[currentIndex];
};

const deleteTask = async (
  _boardId: string,
  taskId: string
): Promise<ITask | undefined> => {
  const currentIndex = [...taskDB].findIndex(
    (item) => item && item.id === taskId
  );
  if (currentIndex === -1) throw Error('error');
  const currentItem = taskDB[currentIndex];
  taskDB.splice(currentIndex, 1);
  return currentItem;
};

const deleteBoardTasks = async (boardId: string): Promise<void> => {
  taskDB = taskDB.filter((item) => item.boardId !== boardId);
};

const deleteUserTasks = async (userId: string): Promise<void> => {
  taskDB
    .filter((item) => item.userId === userId)
    .forEach((item) => {
      const copy = item;
      copy.userId = null;
      return copy;
    });
};

export default {
  getAll,
  createTask,
  getTaskByID,
  deleteTask,
  updateTask,
  deleteBoardTasks,
  deleteUserTasks,
};
