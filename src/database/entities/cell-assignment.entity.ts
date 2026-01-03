import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cell } from './cell.entity';
import { Prisoner } from './prisoner.entity';

@Entity({ name: 'cell_assignments' })
export class CellAssignment {
  @PrimaryGeneratedColumn({ name: 'assignment_id' })
  id: number;

  @ManyToOne(() => Prisoner, (prisoner) => prisoner.cellAssignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'prisoner_id' })
  prisoner: Prisoner;

  @ManyToOne(() => Cell, (cell) => cell.assignments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cell_id' })
  cell: Cell;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate?: Date;

  @Column({ name: 'reason', type: 'text', nullable: true })
  reason?: string;
}
