import { UserType } from 'src/shared/utils/enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Staff } from '../../staff/entities/staff.entity';

@Entity('user_accounts')
export class UserAccount {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 255 })
  passwordHash: string;

  @Column({ type: 'enum', enum: UserType })
  role: UserType;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin?: Date;

  @OneToOne(() => Staff, (staff) => staff.userAccount, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;
}
