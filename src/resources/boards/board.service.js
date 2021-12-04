const boardsRepo = require('./board.memory.repository');
const { deleteBoardTasks } = require('../tasks/task.service.js');

const getAll = () => boardsRepo.getAll();

const createBoard = (board) => boardsRepo.createBoard(board);

const getBoardById = (id) => boardsRepo.getBoardById(id);

const updateBoard = (id, board) => boardsRepo.updateBoard(id, board);

const deleteBoard = (id) => {
  deleteBoardTasks(id);
  boardsRepo.deleteBoard(id);
} 
;

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  deleteBoard,
  updateBoard,
};
