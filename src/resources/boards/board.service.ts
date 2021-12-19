import boardsRepo from './board.memory.repository';
import tasksRepo from '../tasks/task.service';
import { IBoard } from '../../types/interface-types';

const getAll = (): Promise<IBoard[]> => boardsRepo.getAll();

const createBoard = (board: IBoard): Promise<IBoard> =>
  boardsRepo.createBoard(board);

const getBoardById = (id: string): Promise<IBoard> =>
  boardsRepo.getBoardById(id);

const updateBoard = (id: string, board: IBoard): Promise<IBoard | undefined> =>
  boardsRepo.updateBoard(id, board);

const deleteBoard = (id: string): Promise<IBoard | undefined> => {
  tasksRepo.deleteBoardTasks(id);
  return boardsRepo.deleteBoard(id);
};

export default {
  getAll,
  createBoard,
  getBoardById,
  deleteBoard,
  updateBoard,
};
