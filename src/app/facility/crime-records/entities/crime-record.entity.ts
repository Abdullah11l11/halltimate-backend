import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Prisoner } from '../../prisoners/entities/prisoner.entity';
import { CaseEntity } from '../../cases/entities/case.entity';

@Entity('crime_records')
export class CrimeRecord {
  @PrimaryGeneratedColumn()
  crimeId: number;

  @ManyToOne(() => Prisoner, (prisoner) => prisoner.crimeRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'prisoner_id' })
  prisoner: Prisoner;

  @ManyToOne(() => CaseEntity, (legalCase) => legalCase.crimes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'case_id' })
  case: CaseEntity;

  @Column({ length: 200 })
  crimeTitle: string;

  @Column({ type: 'text' })
  crimeDetails: string;

  @Column({ type: 'date' })
  crimeDate: Date;

  @Column({ type: 'int', default: 0 })
  sentenceYears: number;

  @Column({ type: 'int', default: 0 })
  sentenceMonths: number;

  @Column({ type: 'date' })
  sentenceStart: Date;

  @Column({ type: 'date' })
  sentenceEnd: Date;

  @Column({ length: 20 })
  status: string;
}
