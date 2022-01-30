import { IUser } from '../../types/interface-types';
import { getRepository } from 'typeorm';
import User from '../../entity/user.model';

/**
 * Gets all users.
 * @returns list of all users
 */
const getAll = async (): Promise<IUser[]> => {
  const userRepository = getRepository(User);
  return userRepository.find();
};

/**
 * Saves new user to users' list.
 * @param user - new user
 * @returns new user
 */
const createUser = async (user: IUser): Promise<IUser> => {
  const userRepository = getRepository(User);
  const newUser = userRepository.create(user);
  const savedUser = userRepository.save(newUser);
  return savedUser;
};

/**
 * Gets user with specified ID.
 * @param id - user's ID
 * @returns found user
 */
const getUserById = async (id: string): Promise<IUser> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
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
  const userRepository = getRepository(User);
   await userRepository.update(id, userInfo);
   const updatedUser = await userRepository.findOne(id);
   return updatedUser;
};

/**
 * Deletes user from users' list.
 * @param id - user's ID
 * @returns deleted user
 */
const deleteUser = async (id: string): Promise<void> => {
  const userRepository = getRepository(User);
  await userRepository.delete(id);
};
export default { getAll, createUser, updateUser, getUserById, deleteUser };
