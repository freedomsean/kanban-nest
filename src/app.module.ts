import { LoggerModule } from './logger/logger.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { Config } from './config/config';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [Config] }),
    EnvModule,
    LoggerModule.register(),
    DatabaseModule.register(),
    UsersModule,
    // It should call register to generate the dynamic module.
    AuthModule.register({ excludes: [/login/i] }),
    DatabaseModule,
    TasksModule,
  ],
})
export class AppModule {}
