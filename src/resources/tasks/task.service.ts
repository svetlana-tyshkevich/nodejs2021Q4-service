import tasksRepo from './task.memory.repository';
import { ITask } from '../../types/interface-types';

const getAll = (boardId: string): Promise<ITask[]> => tasksRepo.getAll(boardId);

const createTask = (task: ITask): Promise<ITask> => tasksRepo.createTask(task);

const getTaskByID = (boardId: string, taskId: string): Promise<ITask> =>
  tasksRepo.getTaskByID(boardId, taskId);

const updateTask = (
  boardId: string,
  id: string,
  taskBody: ITask
): Promise<ITask | undefined> => tasksRepo.updateTask(boardId, id, taskBody);

const deleteTask = (
  boardId: string,
  taskId: string
): Promise<ITask | undefined> => tasksRepo.deleteTask(boardId, taskId);

const deleteBoardTasks = (boardId: string): Promise<void> =>
  tasksRepo.deleteBoardTasks(boardId);

const deleteUserTasks = (userId: string): Promise<void> =>
  tasksRepo.deleteUserTasks(userId);

export default {
  getAll,
  createTask,
  getTaskByID,
  deleteTask,
  updateTask,
  deleteBoardTasks,
  deleteUserTasks,
};
