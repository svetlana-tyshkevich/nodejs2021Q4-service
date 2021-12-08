import boardsRepo from './board.memory.repository.js';
import tasksRepo from '../tasks/task.service.js';

const getAll = () => boardsRepo.getAll();

const createBoard = (board) => boardsRepo.createBoard(board);

const getBoardById = (id) => boardsRepo.getBoardById(id);

const updateBoard = (id, board) => boardsRepo.updateBoard(id, board);

const deleteBoard = (id) => {
  tasksRepo.deleteBoardTasks(id);
  boardsRepo.deleteBoard(id);
};

export default {
  getAll,
  createBoard,
  getBoardById,
  deleteBoard,
  updateBoard,
};
