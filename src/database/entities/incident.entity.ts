import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Prisoner } from './prisoner.entity';
import { Staff } from './staff.entity';

export enum IncidentType {
  VIOLENCE = 'violence',
  CONTRABAND = 'contraband',
  MEDICAL = 'medical',
  OTHER = 'other',
}

export enum IncidentSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum IncidentStatus {
  OPEN = 'open',
  INVESTIGATING = 'investigating',
  CLOSED = 'closed',
}

@Entity({ name: 'incidents' })
export class Incident {
  @PrimaryGeneratedColumn({ name: 'incident_id' })
  id: number;

  @ManyToOne(() => Prisoner, (prisoner) => prisoner.incidents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'prisoner_id' })
  prisoner: Prisoner;

  @ManyToOne(() => Staff, (staff) => staff.reportedIncidents, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'reported_by_staff_id' })
  reportedBy?: Staff;

  @Column({ name: 'incident_type', type: 'enum', enum: IncidentType })
  incidentType: IncidentType;

  @Column({ name: 'incident_date', type: 'timestamp' })
  incidentDate: Date;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'severity', type: 'enum', enum: IncidentSeverity })
  severity: IncidentSeverity;

  @Column({ name: 'action_taken', type: 'text', nullable: true })
  actionTaken?: string;

  @Column({ name: 'status', type: 'enum', enum: IncidentStatus })
  status: IncidentStatus;
}
