import usersRepo from './user.memory.repository';
import  tasksRepo from '../tasks/task.service';
import { IUser } from '../../types/interface-types';

/**
 * Gets all users.
 * @returns list of all users
 */
const getAll = (): Promise<IUser[]> => usersRepo.getAll();

/**
 * Saves new user to users' list.
 * @param user - new user
 * @returns new user
 */
const getUserById = (id: string): Promise<IUser> => usersRepo.getUserById(id);

/**
 * Gets user with specified ID.
 * @param id - user's ID
 * @returns found user
 */
const createUser = (user: IUser): Promise<IUser> => usersRepo.createUser(user);

/**
 * Updates specific user with new data.
 * @param id - user's ID
 * @param userBody - new data for user
 * @returns updated user
 */
const updateUser = (id: string, userInfo: IUser): Promise<IUser | undefined> => usersRepo.updateUser(id, userInfo);

/**
 * Deletes user from users' list.
 * @param id - user's ID
 * @returns deleted user
 */
const deleteUser = (id: string): Promise<void> => {
  tasksRepo.deleteUserTasks(id);
  return usersRepo.deleteUser(id);
};

export default { getAll, getUserById, createUser, updateUser, deleteUser };
