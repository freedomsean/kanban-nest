import { AuthGuard } from './auth.guard';
import { DatabaseService } from './../database/database.service';
import { DATABASE_PROVIDER } from './../database/database.provider';
import { EnvService } from './../env/env.service';

export const AUTH_GUARD = 'AUTH_GUARD';
export const AUTH_GUARD_EXCLUDING_OPTIONS = 'AUTH_GUARD_EXCLUDING_OPTIONS';

export const AuthProvider = {
  provide: AUTH_GUARD,
  useFactory: (
    envService: EnvService,
    databaseService: DatabaseService,
    excludes: (RegExp | string)[],
  ) => {
    return new AuthGuard(envService, databaseService, excludes);
  },
  inject: [EnvService, DATABASE_PROVIDER, AUTH_GUARD_EXCLUDING_OPTIONS],
};
