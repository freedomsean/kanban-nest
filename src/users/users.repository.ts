import { DATABASE_PROVIDER } from './../database/database.provider';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { DatabaseService } from './../database/database.service';
import { User } from './users.entity';

@Injectable()
export class UsersRepository {
  private _repo: Repository<User>;
  constructor(
    @Inject(DATABASE_PROVIDER) private databaseService: DatabaseService,
  ) {
    this._repo = this.databaseService.getRepository<User>(User);
  }

  async getUserInfoByUsername(username: string): Promise<User> {
    const user = await this._repo.findOne({
      select: ['id', 'password'],
      where: {
        isDeleted: false,
        username,
      },
      relations: ['usersKanbans', 'defaultKanban'],
    });
    user.usersKanbans = user.usersKanbans.filter((kabans) => !kabans.isDeleted);
    return user;
  }
}
