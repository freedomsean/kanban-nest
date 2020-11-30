import { DatabaseService } from './database.service';
import { EnvService } from './../env/env.service';

export const DATABASE_PROVIDER = 'DATABASE_CONNECTION';

export const DatabaseProvider = {
  provide: DATABASE_PROVIDER,
  useFactory: async (envService: EnvService) => {
    // To create connection asynchronously, so it needs to use useFactory.
    const service = new DatabaseService(envService);
    await service.createConnection();
    return service;
  },
  inject: [EnvService],
};
