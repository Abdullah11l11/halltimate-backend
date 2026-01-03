import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Prisoner } from './prisoner.entity';
import { Visitor } from './visitor.entity';

export enum VisitType {
  PERSONAL = 'personal',
  LEGAL = 'legal',
  OFFICIAL = 'official',
}

export enum VisitStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity({ name: 'visits' })
export class Visit {
  @PrimaryGeneratedColumn({ name: 'visit_id' })
  id: number;

  @ManyToOne(() => Prisoner, (prisoner) => prisoner.visits, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'prisoner_id' })
  prisoner: Prisoner;

  @ManyToOne(() => Visitor, (visitor) => visitor.visits, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'visitor_id' })
  visitor: Visitor;

  @Column({ name: 'visit_date', type: 'timestamp' })
  visitDate: Date;

  @Column({ name: 'visit_type', type: 'enum', enum: VisitType })
  visitType: VisitType;

  @Column({ name: 'status', type: 'enum', enum: VisitStatus })
  status: VisitStatus;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;
}
