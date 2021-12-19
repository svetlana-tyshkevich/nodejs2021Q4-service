import tasksRepo from './task.memory.repository';
import { ITask } from '../../types/interface-types';

/**
 * Gets all tasks of specific board.
 * @param boardId - board to which the task is assigned
 * @returns list of all tasks
 */
const getAll = (boardId: string): Promise<ITask[]> => tasksRepo.getAll(boardId);

/**
 * Saves new task to tasks' list.
 * @param task - new task
 * @returns new task
 */
const createTask = (task: ITask): Promise<ITask> => tasksRepo.createTask(task);

/**
 * Gets task with specified ID.
 * @param boardId - board to which the task is assigned
 * @param taskId - task's ID
 * @returns found task
 */
const getTaskByID = (boardId: string, taskId: string): Promise<ITask> =>
  tasksRepo.getTaskByID(boardId, taskId);

  /**
 * Updates specific task with new data.
 * @param boardId - board to which the task is assigned
 * @param id - board's ID
 * @param taskBody - new data for task
 * @returns updated task
 */
const updateTask = (
  boardId: string,
  id: string,
  taskBody: ITask
): Promise<ITask | undefined> => tasksRepo.updateTask(boardId, id, taskBody);

/**
 * Deletes task from tasks' list.
 * @param boardId - board to which the task is assigned
 * @param taskId - task's ID
 * @returns deleted task
 */
const deleteTask = (
  boardId: string,
  taskId: string
): Promise<ITask | undefined> => tasksRepo.deleteTask(boardId, taskId);

/**
 * Deletes all tasks which are assigned to the board to delete.
 * @param boardId - board's ID
 */
const deleteBoardTasks = (boardId: string): Promise<void> =>
  tasksRepo.deleteBoardTasks(boardId);

  /**
 * Unassign all tasks from the user to delete.
 * @param userId - user's ID
 */
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
