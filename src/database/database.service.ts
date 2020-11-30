import { UserKanban } from './../users/user-kanban.entity';
import { KanbanStatus } from './../kanbans/kanban-status.entity';
import { Task } from './../tasks/tasks.entity';
import { Kanban } from './../kanbans/kanbans.entity';
import { BaseEntity, Connection, createConnection, Repository } from 'typeorm';

import { EnvService } from './../env/env.service';
import { User } from './../users/users.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export class DatabaseService {
  private _connection: Connection;

  constructor(private envService: EnvService) {}

  async createConnection(): Promise<void> {
    this._connection = await createConnection({
      type: this.envService.DB_DIALECT as any,
      host: this.envService.DB_HOST,
      port: this.envService.DB_PORT,
      username: this.envService.DB_USER,
      password: this.envService.HTTP_DB_PASSWORD,
      database: this.envService.DB_USED_DATABASE,
      synchronize: true,
      entities: [User, Kanban, KanbanStatus, Task, UserKanban],
      namingStrategy: new SnakeNamingStrategy(),
    });
  }

  get connection() {
    return this._connection;
  }

  getRepository<T extends BaseEntity>(type: new () => T): Repository<T> {
    return this.connection.getRepository(type);
  }

  async closeConnection() {
    await this.connection.close();
    this._connection = undefined;
  }
}
