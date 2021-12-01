const userDB = require('../../common/db.js').users;

const getAll = async () => userDB;

const createUser = async (user) => {
  userDB.push(user);
  return user;
}
module.exports = { getAll, createUser };
