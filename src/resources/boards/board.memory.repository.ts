import db from '../../common/db';
import { IBoard } from '../../types/interface-types';

const boardDB: IBoard[] = db.boards;

const getAll = async (): Promise<IBoard[]> => boardDB;

const createBoard = async (board: IBoard): Promise<IBoard> => {
  boardDB.push(board);
  return board;
};

const getBoardById = async (id: string): Promise<IBoard> => {
  const board = boardDB.find((item) => item.id === id);
  if (!board) throw new Error('Board not found');
  return board;
};

const updateBoard = async (id: string, boardBody: IBoard) => {
  const currentIndex = boardDB.findIndex((item) => item.id === id);
  boardDB[currentIndex] = boardBody;
  return boardDB[currentIndex];
};

const deleteBoard = async (id: string): Promise<IBoard | undefined> => {
  const currentIndex = [...boardDB].findIndex((item) => item && item.id === id);
  if (currentIndex === -1) throw Error('error');
  const currentItem = boardDB[currentIndex];
  boardDB.splice(currentIndex, 1);
  return currentItem;
};
export default { getAll, createBoard, getBoardById, deleteBoard, updateBoard };
