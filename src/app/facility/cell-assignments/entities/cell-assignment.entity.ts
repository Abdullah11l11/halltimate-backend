import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Prisoner } from '../../prisoners/entities/prisoner.entity';
import { Cell } from '../../cells/entities/cell.entity';

@Entity('cell_assignments')
export class CellAssignment {
  @PrimaryGeneratedColumn()
  assignmentId: number;

  @ManyToOne(() => Prisoner, (prisoner) => prisoner.assignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'prisoner_id' })
  prisoner: Prisoner;

  @ManyToOne(() => Cell, (cell) => cell.assignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cell_id' })
  cell: Cell;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column({ type: 'text', nullable: true })
  reason?: string;
}
