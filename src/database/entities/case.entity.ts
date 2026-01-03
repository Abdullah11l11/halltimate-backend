import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CrimeRecord } from './crime-record.entity';
import { Document } from './document.entity';

export enum CaseStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  APPEAL = 'appeal',
}

@Entity({ name: 'cases' })
export class Case {
  @PrimaryGeneratedColumn({ name: 'case_id' })
  id: number;

  @Column({ name: 'case_number', length: 100, unique: true })
  caseNumber: string;

  @Column({ name: 'court_name', length: 200 })
  courtName: string;

  @Column({ name: 'case_type', length: 100 })
  caseType: string;

  @Column({ name: 'status', type: 'enum', enum: CaseStatus })
  status: CaseStatus;

  @Column({ name: 'open_date', type: 'date' })
  openDate: Date;

  @Column({ name: 'close_date', type: 'date', nullable: true })
  closeDate?: Date;

  @OneToMany(() => CrimeRecord, (record) => record.case)
  crimeRecords: CrimeRecord[];

  @OneToMany(() => Document, (document) => document.case)
  documents: Document[];
}
