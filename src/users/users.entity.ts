import { UserKanban } from './user-kanban.entity';
import { Task } from '../tasks/tasks.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Kanban } from '../kanbans/kanbans.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn({ length: 38 })
  id: string;

  @Column({ length: 50, unique: true, nullable: false })
  username: string;

  @Column({ length: 255, unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ length: 60, nullable: false })
  password: string;

  @ManyToOne((type) => Kanban, (kanban) => kanban.users)
  public defaultKanban: Kanban;

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

  @OneToMany((type) => Task, (task) => task.lastModified)
  tasks: Task[];

  @OneToMany((type) => UserKanban, (userKanban) => userKanban.user)
  usersKanbans: UserKanban[];
}
