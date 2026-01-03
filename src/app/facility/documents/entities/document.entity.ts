import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Prisoner } from '../../prisoners/entities/prisoner.entity';
import { CaseEntity } from '../../cases/entities/case.entity';
import { Staff } from '../../staff/entities/staff.entity';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  documentId: number;

  @ManyToOne(() => Prisoner, (prisoner) => prisoner.documents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'prisoner_id' })
  prisoner: Prisoner;

  @ManyToOne(() => CaseEntity, (caseEntity) => caseEntity.documents, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'case_id' })
  case?: CaseEntity;

  @ManyToOne(() => Staff, (staff) => staff.documents, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'uploaded_by' })
  uploadedBy?: Staff;

  @Column({ length: 100 })
  documentType: string;

  @Column({ length: 255 })
  filePath: string;

  @Column({ type: 'timestamp' })
  uploadedAt: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
