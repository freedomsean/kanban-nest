import { KanbanStatus } from './../kanbans/kanban-status.entity';
import { UserKanban } from './../users/user-kanban.entity';
import { Kanban } from './../kanbans/kanbans.entity';
import { UsersService } from './../users/users.service';
import { UsersRepository } from './../users/users.repository';
import { User } from './../users/users.entity';
import { FakeDataUtil } from './../../test/utils/fake-data.util';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import { DatabaseModule } from '../database/database.module';
import { Repository } from 'typeorm';

import {
  TEST_KANBAN_ID,
  TEST_USER_ID,
  TEST_USER_NAME,
  TEST_WRONG_USER_NAME,
} from './../../test/constants/test.constant';
import { Config } from './../config/config';
import { DATABASE_PROVIDER } from './../database/database.provider';
import { DatabaseService } from './../database/database.service';
import { EnvModule } from './../env/env.module';
import { EnvService } from './../env/env.service';
import { AuthController } from '../auth/auth.controller';

describe('AuthController', () => {
  let envService: EnvService;
  let databaseService: DatabaseService;
  let authController: AuthController;
  let userRepo: Repository<User>;
  let kanbanRepo: Repository<Kanban>;
  let userKanbanRepo: Repository<UserKanban>;
  let kanbanStatusRepo: Repository<KanbanStatus>;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [Config] }),
        EnvModule,
        DatabaseModule.register(),
      ],
      controllers: [AuthController],
      providers: [UsersRepository, UsersService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    envService = app.get<EnvService>(EnvService);
    // Generic type is DatabaseService, but the key is DATABASE_PROVIDER, because it is a dynamic module.
    databaseService = app.get<DatabaseService>(DATABASE_PROVIDER);
    userRepo = databaseService.getRepository<User>(User);
    kanbanRepo = databaseService.getRepository<Kanban>(Kanban);
    userKanbanRepo = databaseService.getRepository<UserKanban>(UserKanban);
    kanbanStatusRepo = databaseService.getRepository<KanbanStatus>(
      KanbanStatus,
    );

    await FakeDataUtil.insertKanban(kanbanRepo, kanbanStatusRepo);
    await FakeDataUtil.insertUser(envService, userRepo);
    await FakeDataUtil.insertUserKanban(userKanbanRepo);
  });

  afterEach(async () => {
    await FakeDataUtil.deleteUser(userRepo, userKanbanRepo);
    await FakeDataUtil.deleteKanban(
      kanbanRepo,
      kanbanStatusRepo,
      userKanbanRepo,
    );
    await databaseService.closeConnection();
    jest.restoreAllMocks();
    await app.close();
    app = undefined;
  });

  describe('Test AuthController', () => {
    it('should return users', async () => {
      const data = await authController.login({
        username: TEST_USER_NAME,
        password: TEST_USER_NAME,
      });
      expect(data.user.id).toBe(TEST_USER_ID);
      expect(data.user.username).toBe(TEST_USER_NAME);
      expect(data.defaultKanbanId).toBe(TEST_KANBAN_ID);
      expect(data.kanbans.length).toBe(1);
      expect(data.kanbans[0].id).toBe(TEST_KANBAN_ID);
      const verified = jwt.verify(data.token, envService.JWT_SECRET, {
        subject: data.user.id,
      });
      expect(verified).toBeTruthy();
      const decode = jwt.decode(data.token, { json: true });
      expect(decode['id']).toBe(data.user.id);
    });

    it('wrong username, should throw error', async () => {
      await expect(
        authController.login({
          username: TEST_WRONG_USER_NAME,
          password: TEST_WRONG_USER_NAME,
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('wrong password, should throw error', async () => {
      await expect(
        authController.login({
          username: TEST_USER_NAME,
          password: TEST_WRONG_USER_NAME,
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
