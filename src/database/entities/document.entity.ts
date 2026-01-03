import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Case } from './case.entity';
import { Prisoner } from './prisoner.entity';
import { Staff } from './staff.entity';

@Entity({ name: 'documents' })
export class Document {
  @PrimaryGeneratedColumn({ name: 'document_id' })
  id: number;

  @ManyToOne(() => Prisoner, (prisoner) => prisoner.documents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'prisoner_id' })
  prisoner: Prisoner;

  @ManyToOne(() => Case, (_case) => _case.documents, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'case_id' })
  case?: Case;

  @Column({ name: 'document_type', length: 50 })
  documentType: string;

  @Column({ name: 'file_path', length: 255 })
  filePath: string;

  @ManyToOne(() => Staff, (staff) => staff.uploadedDocuments, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'uploaded_by' })
  uploadedBy?: Staff;

  @Column({ name: 'uploaded_at', type: 'timestamp' })
  uploadedAt: Date;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;
}
