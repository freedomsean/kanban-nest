import { BaseEntity, Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Kanban } from '../kanbans/kanbans.entity';
import { User } from './users.entity';

@Entity('users_kanbans')
export class UserKanban extends BaseEntity {
  @PrimaryColumn({ length: 38 })
  userId: string;

  @PrimaryColumn({ length: 38 })
  kanbanId: string;

  @Column({ type: 'varchar', length: 5 })
  type: 'admin' | 'user';

  @Column({ type: 'boolean', nullable: false, default: false })
  isDeleted: boolean;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.usersKanbans)
  public user: User;

  @ManyToOne((type) => Kanban, (kanban) => kanban.usersKanbans)
  public kanban: Kanban;
}
