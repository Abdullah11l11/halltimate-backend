import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CellAssignment } from './cell-assignment.entity';
import { CrimeRecord } from './crime-record.entity';
import { Document } from './document.entity';
import { HealthRecord } from './health-record.entity';
import { Incident } from './incident.entity';
import { Visit } from './visit.entity';

export enum PrisonerGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum PrisonerStatus {
  ACTIVE = 'active',
  RELEASED = 'released',
  TRANSFERRED = 'transferred',
}

export enum PrisonerRiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity({ name: 'prisoners' })
export class Prisoner {
  @PrimaryGeneratedColumn({ name: 'prisoner_id' })
  id: number;

  @Column({ name: 'full_name', length: 200 })
  fullName: string;

  @Column({ name: 'national_id', length: 50, unique: true })
  nationalId: string;

  @Column({ name: 'gender', type: 'enum', enum: PrisonerGender })
  gender: PrisonerGender;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: Date;

  @Column({ name: 'admission_date', type: 'date' })
  admissionDate: Date;

  @Column({ name: 'status', type: 'enum', enum: PrisonerStatus })
  status: PrisonerStatus;

  @Column({ name: 'risk_level', type: 'enum', enum: PrisonerRiskLevel })
  riskLevel: PrisonerRiskLevel;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => CellAssignment, (assignment) => assignment.prisoner)
  cellAssignments: CellAssignment[];

  @OneToMany(() => CrimeRecord, (record) => record.prisoner)
  crimeRecords: CrimeRecord[];

  @OneToMany(() => HealthRecord, (record) => record.prisoner)
  healthRecords: HealthRecord[];

  @OneToMany(() => Incident, (incident) => incident.prisoner)
  incidents: Incident[];

  @OneToMany(() => Document, (document) => document.prisoner)
  documents: Document[];

  @OneToMany(() => Visit, (visit) => visit.prisoner)
  visits: Visit[];
}
