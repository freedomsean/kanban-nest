import { DynamicModule, Module } from '@nestjs/common';

import { LoggerInterceptorProvider } from './logger-interceptor.provider';
import { LoggerProvider } from './logger.provider';

@Module({})
export class LoggerModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      providers: [LoggerProvider, LoggerInterceptorProvider],
      exports: [LoggerProvider, LoggerInterceptorProvider],
    };
  }
}
