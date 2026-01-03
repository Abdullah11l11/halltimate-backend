import { CURRENT_TIMESTAMP } from 'src/shared/utils/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Visit } from '../../visits/entities/visit.entity';

@Entity('visitors')
export class Visitor {
  @PrimaryGeneratedColumn()
  visitorId: number;

  @Column({ length: 200 })
  fullName: string;

  @Column({ length: 50, unique: true })
  nationalId: string;

  @Column({ length: 30, nullable: true })
  phone?: string;

  @Column({ length: 100 })
  relationshipToPrisoner: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => Visit, (visit) => visit.visitor)
  visits?: Visit[];

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;
}
