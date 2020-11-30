import { UserKanban } from './../../src/users/user-kanban.entity';
import { KanbanStatus } from './../../src/kanbans/kanban-status.entity';
import { Kanban } from './../../src/kanbans/kanbans.entity';
import { EnvService } from './../../src/env/env.service';
import { PasswordService } from './../../src/utils/password.service';
import {
  TEST_USER_ID,
  TEST_USER_NAME,
  TEST_KANBAN_ID,
  TEST_KANBAN_STATUS,
} from './../constants/test.constant';
import { User } from './../../src/users/users.entity';
import { Repository } from 'typeorm';

export class FakeDataUtil {
  static async insertKanban(
    kanbanRepo: Repository<Kanban>,
    statusRepo: Repository<KanbanStatus>,
  ) {
    const kanban = new Kanban();
    kanban.id = TEST_KANBAN_ID;
    kanban.name = TEST_KANBAN_ID;

    await kanbanRepo.insert(kanban);
    for (let i = 0; i < TEST_KANBAN_STATUS.length; i++) {
      await statusRepo.insert({
        ...TEST_KANBAN_STATUS[i],
        order: i,
        kanban,
      });
    }
  }
  static async insertUser(envService: EnvService, userRepo: Repository<User>) {
    await userRepo.insert({
      id: TEST_USER_ID,
      username: TEST_USER_NAME,
      password: PasswordService.generateSecureHash(
        TEST_USER_NAME,
        envService.SALT_ROUNDS,
      ),
      defaultKanban: {
        id: TEST_KANBAN_ID,
      },
      email: TEST_USER_NAME,
    });
  }

  static async insertUserKanban(repo: Repository<UserKanban>) {
    await repo.insert({
      userId: TEST_USER_ID,
      kanbanId: TEST_KANBAN_ID,
      type: 'user',
    });
  }

  static async deleteKanban(
    kanbanRepo: Repository<Kanban>,
    statusRepo: Repository<KanbanStatus>,
    userKanban: Repository<UserKanban>,
  ) {
    await statusRepo.delete({ kanban: { id: TEST_KANBAN_ID } });
    await userKanban.delete({ kanbanId: TEST_KANBAN_ID });
    await kanbanRepo.delete(TEST_KANBAN_ID);
  }

  static async deleteUser(
    userRepo: Repository<User>,
    userKanban: Repository<UserKanban>,
  ) {
    await userKanban.delete({ userId: TEST_USER_ID });
    await userRepo.delete(TEST_USER_ID);
  }
}
