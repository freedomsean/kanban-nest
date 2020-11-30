import { EnvService } from './../env/env.service';
import { LoggerService } from './logger.service';

export const LOGGER_PROVIDER = 'LOGGER_PROVIDER';

export const LoggerProvider = {
  provide: LOGGER_PROVIDER,
  useFactory: (envService: EnvService) => {
    const service = new LoggerService(envService);
    return service;
  },
  inject: [EnvService],
};
