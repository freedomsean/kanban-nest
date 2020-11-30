import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import { AUTH_GUARD } from './auth/auth.provider';
import { LOGGER_INTERCEPTOR_PROVIDER } from './logger/logger-interceptor.provider';
import { LoggerInterceptor } from './logger/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Use global guards and get the instance from the app.
  app.useGlobalGuards(app.get<AuthGuard>(AUTH_GUARD));
  app.useGlobalInterceptors(
    app.get<LoggerInterceptor>(LOGGER_INTERCEPTOR_PROVIDER),
  );
  await app.listen(3000);
}
bootstrap();
