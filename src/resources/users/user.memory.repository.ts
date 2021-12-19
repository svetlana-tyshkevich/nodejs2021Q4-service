import db from '../../common/db';
import { IUser } from '../../types/interface-types';

const userDB: IUser[] = db.users;

const getAll = async (): Promise<IUser[]> => userDB;

const createUser = async (user: IUser): Promise<IUser> => {
  userDB.push(user);
  return user;
};

const getUserById = async (id: string): Promise<IUser> => {
  const user = userDB.find((item) => item.id === id);
  if (!user) throw Error('User not found');
  return user;
};

const updateUser = async (
  id: string,
  userInfo: IUser
): Promise<IUser | undefined> => {
  const currentIndex = userDB.findIndex((item) => item.id === id);
  userDB[currentIndex] = userInfo;
  return userDB[currentIndex];
};

const deleteUser = async (id: string): Promise<void> => {
  const currentIndex = userDB.findIndex((item: IUser) => item.id === id);
  userDB.splice(currentIndex, 1);
};
export default { getAll, createUser, updateUser, getUserById, deleteUser };
