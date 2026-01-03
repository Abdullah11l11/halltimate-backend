import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Visit } from './visit.entity';

@Entity({ name: 'visitors' })
export class Visitor {
  @PrimaryGeneratedColumn({ name: 'visitor_id' })
  id: number;

  @Column({ name: 'full_name', length: 200 })
  fullName: string;

  @Column({ name: 'national_id', length: 50, unique: true })
  nationalId: string;

  @Column({ name: 'phone', length: 50, nullable: true })
  phone?: string;

  @Column({ name: 'relationship_to_prisoner', length: 50, nullable: true })
  relationshipToPrisoner?: string;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => Visit, (visit) => visit.visitor)
  visits: Visit[];
}
