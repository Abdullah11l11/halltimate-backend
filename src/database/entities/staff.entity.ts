import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Document } from './document.entity';
import { HealthRecord } from './health-record.entity';
import { Incident } from './incident.entity';
import { UserAccount } from './user-account.entity';

export enum StaffStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

@Entity({ name: 'staff' })
export class Staff {
  @PrimaryGeneratedColumn({ name: 'staff_id' })
  id: number;

  @Column({ name: 'full_name', length: 200 })
  fullName: string;

  @Column({ name: 'national_id', length: 50, unique: true })
  nationalId: string;

  @Column({ name: 'position', length: 50 })
  position: string;

  @Column({ name: 'phone', length: 50, nullable: true })
  phone?: string;

  @Column({ name: 'email', length: 100, nullable: true, unique: true })
  email?: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: StaffStatus,
    default: StaffStatus.ACTIVE,
  })
  status: StaffStatus;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => UserAccount, (account) => account.staff)
  userAccounts: UserAccount[];

  @OneToMany(() => HealthRecord, (record) => record.doctor)
  healthRecords: HealthRecord[];

  @OneToMany(() => Incident, (incident) => incident.reportedBy)
  reportedIncidents: Incident[];

  @OneToMany(() => Document, (document) => document.uploadedBy)
  uploadedDocuments: Document[];
}
