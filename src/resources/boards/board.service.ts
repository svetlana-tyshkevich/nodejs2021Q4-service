import boardsRepo from './board.memory.repository';
import tasksRepo from '../tasks/task.service';
import { IBoard } from '../../types/interface-types';

/**
 * Gets all boards.
 * @returns list of all boards
 */
const getAll = (): Promise<IBoard[]> => boardsRepo.getAll();


/**
 * Saves new board to boards' list.
 * @param board - new board
 * @returns new board
 */
const createBoard = (board: IBoard): Promise<IBoard> =>
  boardsRepo.createBoard(board);


  /**
 * Gets board with specified ID.
 * @param id - board's ID
 * @returns found board
 */
const getBoardById = (id: string): Promise<IBoard> =>
  boardsRepo.getBoardById(id);

  /**
 * Updates specific board with new data.
 * @param id - board's ID
 * @param boardBody - new data for board
 * @returns updated board
 */
const updateBoard = (id: string, board: IBoard): Promise<IBoard | undefined> =>
  boardsRepo.updateBoard(id, board);

  /**
 * Deletes board from boards' list.
 * @param id - board's ID
 * @returns deleted board
 */
const deleteBoard = (id: string): Promise<void> => {
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
