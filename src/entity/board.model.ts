import { v4 as uuid } from 'uuid';
import { IBoard, IColumn } from '../types/interface-types';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import Col from './column.model';

/** Class representing a board. */
@Entity({ name: 'boards' })
class Board {
  @PrimaryColumn('uuid')
  id?: string;

  @Column()
  title: string;

  @OneToMany(() => Col, ({ board }: { board: IBoard }) => board, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  columns?: IColumn[] | null;

  /**
   * Creates a board.
   *
   * @param  title - board's title
   * @param columns - board's columns
   */
  constructor({ id = uuid(), title = 'Board', columns = null } = {} as IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
