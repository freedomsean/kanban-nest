import { Task } from '../tasks/tasks.entity';
import { Kanban } from './kanbans.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity('kanbans_statuses')
@Unique('order_kanban_id', ['order', 'kanban'])
@Unique('name_kanban_id', ['name', 'kanban'])
export class KanbanStatus extends BaseEntity {
  @PrimaryColumn({ length: 38 })
  id: string;

  @Column({ type: 'int' })
  order: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @ManyToOne((type) => Kanban, (kanban) => kanban.statuses)
  kanban: Kanban;

  @ManyToOne((type) => User, (user) => user.tasks)
  @JoinColumn({ name: 'last_modified' })
  lastModified: User;

  @OneToMany((type) => Task, (task) => task.status)
  tasks: Task[];

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
}
