import { CURRENT_TIMESTAMP } from 'src/shared/utils/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cell } from '../../cells/entities/cell.entity';
import { CellAssignment } from '../../cell-assignments/entities/cell-assignment.entity';
import { CrimeRecord } from '../../crime-records/entities/crime-record.entity';
import { Visit } from '../../visits/entities/visit.entity';
import { Incident } from '../../incidents/entities/incident.entity';
import { HealthRecord } from '../../health-records/entities/health-record.entity';
import { Document } from '../../documents/entities/document.entity';

@Entity('prisoners')
export class Prisoner {
  @PrimaryGeneratedColumn()
  prisonerId: number;

  @Column({ length: 200 })
  fullName: string;

  @Column({ length: 50, unique: true })
  nationalId: string;

  @Column({ length: 10 })
  gender: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'date' })
  admissionDate: Date;

  @Column({ length: 50 })
  status: string;

  @Column({ length: 20 })
  riskLevel: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => Cell, (cell) => cell.prisoners, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'current_cell_id' })
  currentCell?: Cell;

  @OneToMany(() => CellAssignment, (assignment) => assignment.prisoner)
  assignments?: CellAssignment[];

  @OneToMany(() => CrimeRecord, (crime) => crime.prisoner)
  crimeRecords?: CrimeRecord[];

  @OneToMany(() => Visit, (visit) => visit.prisoner)
  visits?: Visit[];

  @OneToMany(() => Incident, (incident) => incident.prisoner)
  incidents?: Incident[];

  @OneToMany(() => HealthRecord, (record) => record.prisoner)
  healthRecords?: HealthRecord[];

  @OneToMany(() => Document, (document) => document.prisoner)
  documents?: Document[];

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;
}
