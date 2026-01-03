import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Prisoner } from './prisoner.entity';
import { Staff } from './staff.entity';

export enum HealthRecordType {
  CHECKUP = 'checkup',
  TREATMENT = 'treatment',
  EMERGENCY = 'emergency',
}

export enum HealthRecordStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  CLOSED = 'closed',
}

@Entity({ name: 'health_records' })
export class HealthRecord {
  @PrimaryGeneratedColumn({ name: 'health_record_id' })
  id: number;

  @ManyToOne(() => Prisoner, (prisoner) => prisoner.healthRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'prisoner_id' })
  prisoner: Prisoner;

  @Column({ name: 'record_type', type: 'enum', enum: HealthRecordType })
  recordType: HealthRecordType;

  @Column({ name: 'record_date', type: 'timestamp' })
  recordDate: Date;

  @ManyToOne(() => Staff, (staff) => staff.healthRecords, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor?: Staff;

  @Column({ name: 'diagnosis', type: 'text', nullable: true })
  diagnosis?: string;

  @Column({ name: 'treatment', type: 'text', nullable: true })
  treatment?: string;

  @Column({ name: 'status', type: 'enum', enum: HealthRecordStatus })
  status: HealthRecordStatus;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;
}
