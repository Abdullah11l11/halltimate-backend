import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Case } from './case.entity';
import { Prisoner } from './prisoner.entity';

export enum CrimeRecordStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  APPEAL = 'appeal',
}

@Entity({ name: 'crime_records' })
export class CrimeRecord {
  @PrimaryGeneratedColumn({ name: 'crime_id' })
  id: number;

  @ManyToOne(() => Prisoner, (prisoner) => prisoner.crimeRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'prisoner_id' })
  prisoner: Prisoner;

  @ManyToOne(() => Case, (_case) => _case.crimeRecords, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'case_id' })
  case?: Case;

  @Column({ name: 'crime_title', length: 200 })
  crimeTitle: string;

  @Column({ name: 'crime_date', type: 'date' })
  crimeDate: Date;

  @Column({ name: 'crime_details', type: 'text', nullable: true })
  crimeDetails?: string;

  @Column({ name: 'sentence_years', type: 'int', nullable: true })
  sentenceYears?: number;

  @Column({ name: 'sentence_months', type: 'int', nullable: true })
  sentenceMonths?: number;

  @Column({ name: 'sentence_start', type: 'date', nullable: true })
  sentenceStart?: Date;

  @Column({ name: 'sentence_end', type: 'date', nullable: true })
  sentenceEnd?: Date;

  @Column({ name: 'status', type: 'enum', enum: CrimeRecordStatus })
  status: CrimeRecordStatus;
}
