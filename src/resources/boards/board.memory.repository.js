const boardDB = require('../../common/db.js').boards;

const getAll = async () => boardDB;

const createBoard = async (board) => {
  boardDB.push(board);
  if (!board) throw new Error('error');
  return board;
};

const getBoardById = async (id) => {
  const board = boardDB.find((item) => item.id === id);
  if (!board) throw new Error('error');
  return board;
};

const updateBoard = async (id, boardBody) => {
  const currentIndex = boardDB.findIndex((item) => item.id === id);

  const { title, columns } = boardBody;
  boardDB[currentIndex].title = title;
  boardDB[currentIndex].columns = columns;

  return boardDB[currentIndex];
};

const deleteBoard = async (id) => {
  const currentIndex = [...boardDB].findIndex((item) => item && item.id === id);
  if (currentIndex === -1) throw Error('error');
  const currentItem = boardDB[currentIndex];
  boardDB.splice(currentIndex, 1);
  return currentItem;
};
module.exports = {
  getAll,
  createBoard,
  getBoardById,
  deleteBoard,
  updateBoard,
};
