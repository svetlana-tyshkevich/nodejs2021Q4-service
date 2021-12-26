import db from '../../common/db';
import { IBoard } from '../../types/interface-types';


const boardDB: IBoard[] = db.boards;

/**
 * Return all boards from database
 * @returns array of all boards 
 */
const getAll = async (): Promise<IBoard[]> => boardDB;

/**
 * Saves new board to boards' list.
 * @param board - new board
 * @returns new board
 */
const createBoard = async (board: IBoard): Promise<IBoard> => {
  boardDB.push(board);
  return board;
};

/**
 * Gets board with specified ID.
 * @param id - board's ID
 * @returns found board
 */
const getBoardById = async (id: string): Promise<IBoard> => {
  const board = boardDB.find((item) => item.id === id);
  if (!board) throw new Error('Board not found');
  return board;
};

/**
 * Updates specific board with new data.
 * @param id - board's ID
 * @param boardBody - new data for board
 * @returns updated board
 */
const updateBoard = async (id: string, boardBody: IBoard) => {
  const currentIndex = boardDB.findIndex((item) => item.id === id);
  boardDB[currentIndex] = boardBody;
  return boardDB[currentIndex];
};

/**
 * Deletes board from boards' list.
 * @param id - board's ID
 * @returns deleted board
 */
const deleteBoard = async (id: string): Promise<IBoard | undefined> => {
  const currentIndex = [...boardDB].findIndex((item) => item && item.id === id);
  if (currentIndex === -1) throw Error('error');
  const currentItem = boardDB[currentIndex];
  boardDB.splice(currentIndex, 1);
  return currentItem;
};
export default { getAll, createBoard, getBoardById, deleteBoard, updateBoard };
