import db from '../../common/db';
import { IUser } from '../../types/interface-types';

const userDB: IUser[] = db.users;

/**
 * Gets all users.
 * @returns list of all users
 */
const getAll = async (): Promise<IUser[]> => userDB;

/**
 * Saves new user to users' list.
 * @param user - new user
 * @returns new user
 */
const createUser = async (user: IUser): Promise<IUser> => {
  userDB.push(user);
  return user;
};

/**
 * Gets user with specified ID.
 * @param id - user's ID
 * @returns found user
 */
const getUserById = async (id: string): Promise<IUser> => {
  const user = userDB.find((item) => item.id === id);
  if (!user) throw Error('User not found');
  return user;
};

/**
 * Updates specific user with new data.
 * @param id - user's ID
 * @param userBody - new data for user
 * @returns updated user
 */
const updateUser = async (
  id: string,
  userInfo: IUser
): Promise<IUser | undefined> => {
  const currentIndex = userDB.findIndex((item) => item.id === id);
  userDB[currentIndex] = userInfo;
  return userDB[currentIndex];
};

/**
 * Deletes user from users' list.
 * @param id - user's ID
 * @returns deleted user
 */
const deleteUser = async (id: string): Promise<void> => {
  const currentIndex = userDB.findIndex((item: IUser) => item.id === id);
  userDB.splice(currentIndex, 1);
};
export default { getAll, createUser, updateUser, getUserById, deleteUser };
