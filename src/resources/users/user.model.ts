import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../types/interface-types';

class User implements IUser {
  id?: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {} as User) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser): Omit<IUser, "password"> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
