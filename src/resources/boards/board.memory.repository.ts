import { getRepository } from 'typeorm';
import { IBoard } from '../../types/interface-types';
import Board from '../../entity/board.model';

/**
 * Return all boards from database
 * @returns array of all boards
 */
const getAll = async (): Promise<IBoard[]> => {
  const boardRepository =  getRepository(Board);
  const boards = await boardRepository.find();
  return boards;
};

/**
 * Saves new board to boards' list.
 * @param board - new board
 * @returns new board
 */
const createBoard = async (board: IBoard): Promise<IBoard> => {
  const boardRepository = getRepository(Board);
  const newBoard = await boardRepository.create(board);
  const savedBoard = await boardRepository.save(newBoard);
  return savedBoard;
};

/**
 * Gets board with specified ID.
 * @param id - board's ID
 * @returns found board
 */
const getBoardById = async (id: string): Promise<IBoard> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(id);
  if (!board) throw Error('Board not found');
  return board;
};

/**
 * Updates specific board with new data.
 * @param id - board's ID
 * @param boardBody - new data for board
 * @returns updated board
 */
const updateBoard = async (id: string, boardBody: IBoard) => {
  const boardRepository = getRepository(Board);
  await boardRepository.update(id, boardBody);
  console.log(boardBody);
  const updatedBoard = await boardRepository.findOne(id);
  console.log(updatedBoard);
  return updatedBoard;
};

/**
 * Deletes board from boards' list.
 * @param id - board's ID
 * @returns deleted board
 */
const deleteBoard = async (id: string): Promise<void> => {
  const boardRepository = getRepository(Board);
  await boardRepository.delete(id);
};
export default { getAll, createBoard, getBoardById, deleteBoard, updateBoard };
