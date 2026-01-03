import { CURRENT_TIMESTAMP } from 'src/shared/utils/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CrimeRecord } from '../../crime-records/entities/crime-record.entity';
import { Document } from '../../documents/entities/document.entity';

@Entity('cases')
export class CaseEntity {
  @PrimaryGeneratedColumn()
  caseId: number;

  @Column({ length: 50, unique: true })
  caseNumber: string;

  @Column({ length: 200 })
  courtName: string;

  @Column({ length: 100 })
  caseType: string;

  @Column({ length: 20 })
  status: string;

  @Column({ type: 'date' })
  openDate: Date;

  @Column({ type: 'date', nullable: true })
  closeDate?: Date;

  @OneToMany(() => CrimeRecord, (crime) => crime.case)
  crimes?: CrimeRecord[];

  @OneToMany(() => Document, (document) => document.case)
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
