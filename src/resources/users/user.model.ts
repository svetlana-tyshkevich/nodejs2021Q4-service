import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../types/interface-types';

/** Class representing an user . */
class User implements IUser {
  id?: string;

  name: string;

  login: string;

  password: string;

  /**
   * Creates an user.
   * @param name - user's name
   * @param login - user's login
   * @param password - user's password
   */
  constructor(
    {
      id = uuidv4(),
      name = 'USER',
      login = 'user',
      password = 'P@55w0rd',
    } = {} as User
  ) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Gets safe user data (without password).
   * @param user - complete user data
   * @returns safe user data
   */
  static toResponse(user: IUser): Omit<IUser, 'password'> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
