import { LoggerInterceptor } from './logger.interceptor';
import { LOGGER_PROVIDER } from './logger.provider';
import { LoggerService } from './logger.service';

export const LOGGER_INTERCEPTOR_PROVIDER = 'LOGGER_INTERCEPTOR_PROVIDER';

export const LoggerInterceptorProvider = {
  provide: LOGGER_INTERCEPTOR_PROVIDER,
  useFactory: (loggerService: LoggerService) => {
    const service = new LoggerInterceptor(loggerService);
    return service;
  },
  inject: [LOGGER_PROVIDER],
};
