import { DatabaseProvider } from './database.provider';
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      providers: [DatabaseProvider],
      exports: [DatabaseProvider],
    };
  }
}
