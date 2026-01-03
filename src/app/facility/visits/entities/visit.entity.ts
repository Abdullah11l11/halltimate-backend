import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Prisoner } from '../../prisoners/entities/prisoner.entity';
import { Visitor } from '../../visitors/entities/visitor.entity';

@Entity('visits')
export class Visit {
  @PrimaryGeneratedColumn()
  visitId: number;

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

  @Column({ type: 'timestamp' })
  visitDate: Date;

  @Column({ length: 50 })
  visitType: string;

  @Column({ length: 20 })
  status: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
