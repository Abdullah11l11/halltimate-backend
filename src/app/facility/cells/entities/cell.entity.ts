import { CURRENT_TIMESTAMP } from 'src/shared/utils/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CellAssignment } from '../../cell-assignments/entities/cell-assignment.entity';
import { Prisoner } from '../../prisoners/entities/prisoner.entity';

@Entity('cells')
export class Cell {
  @PrimaryGeneratedColumn()
  cellId: number;

  @Column({ length: 50 })
  blockName: string;

  @Column({ length: 20 })
  securityLevel: string;

  @Column({ length: 20, unique: true })
  cellNumber: string;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'int', default: 0 })
  currentOccupancy: number;

  @Column({ length: 50 })
  cellType: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => CellAssignment, (assignment) => assignment.cell)
  assignments?: CellAssignment[];

  @OneToMany(() => Prisoner, (prisoner) => prisoner.currentCell)
  prisoners?: Prisoner[];

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;
}
