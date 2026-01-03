import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CellAssignment } from './cell-assignment.entity';

export enum CellSecurityLevel {
  MINIMUM = 'minimum',
  MEDIUM = 'medium',
  MAXIMUM = 'maximum',
}

export enum CellType {
  SINGLE = 'single',
  DOUBLE = 'double',
  DORMITORY = 'dormitory',
}

@Entity({ name: 'cells' })
export class Cell {
  @PrimaryGeneratedColumn({ name: 'cell_id' })
  id: number;

  @Column({ name: 'block_name', length: 50 })
  blockName: string;

  @Column({ name: 'security_level', type: 'enum', enum: CellSecurityLevel })
  securityLevel: CellSecurityLevel;

  @Column({ name: 'cell_number', length: 20 })
  cellNumber: string;

  @Column({ name: 'capacity', type: 'int' })
  capacity: number;

  @Column({ name: 'current_occupancy', type: 'int' })
  currentOccupancy: number;

  @Column({ name: 'cell_type', type: 'enum', enum: CellType })
  cellType: CellType;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => CellAssignment, (assignment) => assignment.cell)
  assignments: CellAssignment[];
}
