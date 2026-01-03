import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Prisoner } from '../../prisoners/entities/prisoner.entity';
import { Staff } from '../../staff/entities/staff.entity';

@Entity('incidents')
export class Incident {
  @PrimaryGeneratedColumn()
  incidentId: number;

  @ManyToOne(() => Prisoner, (prisoner) => prisoner.incidents, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'prisoner_id' })
  prisoner?: Prisoner;

  @ManyToOne(() => Staff, (staff) => staff.incidents, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'reported_by_staff_id' })
  reportedBy?: Staff;

  @Column({ length: 100 })
  incidentType: string;

  @Column({ type: 'timestamp' })
  incidentDate: Date;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 20 })
  severity: string;

  @Column({ type: 'text', nullable: true })
  actionTaken?: string;

  @Column({ length: 20 })
  status: string;
}
