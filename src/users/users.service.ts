import { Injectable } from '@nestjs/common';

import { PasswordService } from '../utils/password.service';
import {
  LoginInfoError,
  UserNotExistError,
} from './../exception/auth.exception';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  findAll(): string {
    return 'This action returns all users';
  }

  async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<User> {
    const user = await this.usersRepository.getUserInfoByUsername(username);
    if (!user) {
      throw new UserNotExistError();
    }

    if (PasswordService.compareSecureHash(password, user?.password)) {
      return user;
    } else {
      throw new LoginInfoError();
    }
  }
}
