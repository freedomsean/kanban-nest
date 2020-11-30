import { UsersRepository } from './../users/users.repository';
import { UsersService } from './../users/users.service';
import { UsersModule } from './../users/users.module';
import { AuthController } from './auth.controller';
import { AuthProvider, AUTH_GUARD_EXCLUDING_OPTIONS } from './auth.provider';
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class AuthModule {
  // It is impossible to use guard which needs other providers by decorator, so we use dynamic module for main module to register that. Guard decorator is initialized before the initialization of dependencies. It means it cannot get any dependency.
  static register(options: { excludes: (RegExp | string)[] }): DynamicModule {
    return {
      imports: [UsersModule],
      module: AuthModule,
      controllers: [AuthController],
      providers: [
        {
          provide: AUTH_GUARD_EXCLUDING_OPTIONS,
          useValue: options.excludes,
        },
        AuthProvider,
        UsersRepository,
        UsersService,
      ],
      exports: [AuthProvider],
    };
  }
}
