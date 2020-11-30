import { KanbanStatus } from '../kanbans/kanban-status.entity';
import { Kanban } from '../kanbans/kanbans.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity('tasks')
export class Task extends BaseEntity {
  @PrimaryColumn({ length: 38 })
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @ManyToOne((type) => Kanban, (kanban) => kanban.statuses)
  @JoinColumn({ name: 'kanban_id' })
  kanbanId: Kanban;

  @ManyToOne((type) => User, (user) => user.tasks)
  @JoinColumn({ name: 'last_modified' })
  lastModified: User;

  @ManyToOne((type) => KanbanStatus, (status) => status.tasks)
  @JoinColumn({ name: 'status' })
  status: KanbanStatus;

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
