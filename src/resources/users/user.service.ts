import usersRepo from './user.memory.repository';
import  tasksRepo from '../tasks/task.service';
import { IUser } from '../../types/interface-types';

const getAll = (): Promise<IUser[]> => usersRepo.getAll();

const getUserById = (id: string): Promise<IUser> => usersRepo.getUserById(id);

const createUser = (user: IUser): Promise<IUser> => usersRepo.createUser(user);

const updateUser = (id: string, userInfo: IUser): Promise<IUser | undefined> => usersRepo.updateUser(id, userInfo);

const deleteUser = (id: string): Promise<void> => {
  tasksRepo.deleteUserTasks(id);
  return usersRepo.deleteUser(id);
};

export default { getAll, getUserById, createUser, updateUser, deleteUser };
