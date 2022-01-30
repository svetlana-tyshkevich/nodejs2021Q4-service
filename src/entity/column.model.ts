import { v4 as uuid } from 'uuid';
import { IColumn, IBoard } from '../types/interface-types';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import Board from './board.model';

/** Class representing a board. */
@Entity({name: 'columns'})
class Col {
  @PrimaryColumn('uuid')
  id?: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  boardId: string;

  @ManyToOne(() => Board, {
    onDelete: 'CASCADE',
  })
  board!: IBoard;


  /**
   * Creates a column.
   *
   * @param  title - column's title
   * @param order - column's order
   */
  constructor({ id = uuid(), title = 'Column', order = 1 } = {} as IColumn) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.boardId = '';
  }
}

export default Col;
