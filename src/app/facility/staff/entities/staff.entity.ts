import { CURRENT_TIMESTAMP } from 'src/shared/utils/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAccount } from '../../user-accounts/entities/user-account.entity';
import { Incident } from '../../incidents/entities/incident.entity';
import { HealthRecord } from '../../health-records/entities/health-record.entity';
import { Document } from '../../documents/entities/document.entity';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn()
  staffId: number;

  @Column({ length: 200 })
  fullName: string;

  @Column({ length: 50, unique: true })
  nationalId: string;

  @Column({ length: 100 })
  position: string;

  @Column({ length: 30, nullable: true })
  phone?: string;

  @Column({ length: 100, nullable: true })
  email?: string;

  @Column({ length: 30, default: 'Active' })
  status: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @OneToOne(() => UserAccount, (account) => account.staff)
  userAccount?: UserAccount;

  @OneToMany(() => Incident, (incident) => incident.reportedBy)
  incidents?: Incident[];

  @OneToMany(() => HealthRecord, (record) => record.doctor)
  healthRecords?: HealthRecord[];

  @OneToMany(() => Document, (document) => document.uploadedBy)
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
