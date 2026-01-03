import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Prisoner } from '../../prisoners/entities/prisoner.entity';
import { Staff } from '../../staff/entities/staff.entity';

@Entity('health_records')
export class HealthRecord {
  @PrimaryGeneratedColumn()
  healthRecordId: number;

  @ManyToOne(() => Prisoner, (prisoner) => prisoner.healthRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'prisoner_id' })
  prisoner: Prisoner;

  @ManyToOne(() => Staff, (staff) => staff.healthRecords, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor?: Staff;

  @Column({ length: 50 })
  recordType: string;

  @Column({ type: 'timestamp' })
  recordDate: Date;

  @Column({ length: 200 })
  diagnosis: string;

  @Column({ type: 'text', nullable: true })
  treatment?: string;

  @Column({ length: 20 })
  status: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
