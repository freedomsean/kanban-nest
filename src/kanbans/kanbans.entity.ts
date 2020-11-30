import { User } from '../users/users.entity';
import { UserKanban } from '../users/user-kanban.entity';
import { KanbanStatus } from './kanban-status.entity';
import { Task } from '../tasks/tasks.entity';
import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('kanbans')
export class Kanban extends BaseEntity {
  @PrimaryColumn({ length: 38 })
  id: string;

  @Column({ length: 50, unique: true, nullable: false })
  name: string;

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

  @OneToMany((type) => Task, (task) => task.kanbanId)
  tasks: Task[];

  @OneToMany((type) => KanbanStatus, (status) => status.kanban)
  statuses: KanbanStatus[];

  @OneToMany((type) => UserKanban, (userKanban) => userKanban.kanban)
  usersKanbans: UserKanban[];

  @OneToMany((type) => User, (user) => user.defaultKanban)
  users: User[];
}
