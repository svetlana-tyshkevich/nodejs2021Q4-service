const userDB = require('../../common/db.js').users;

const getAll = async () => userDB;

const createUser = async (user) => {
  userDB.push(user);
  return user;
}

const getUserById = async (id) => userDB.find((item) => item.id === id);

const updateUser = async (id, userInfo) => {
  const currentIndex = userDB.findIndex((item) => item.id === id);

  const { name, login, password } = userInfo;
  userDB[currentIndex].name = name;
  userDB[currentIndex].login = login;
  userDB[currentIndex].password = password;

  return userDB[currentIndex];
}

const deleteUser = async (id) => {
  const currentIndex = userDB.indexOf((item) => item.id === id);
  userDB.splice(currentIndex, 1);
};
module.exports = { getAll, createUser, updateUser, getUserById, deleteUser };
