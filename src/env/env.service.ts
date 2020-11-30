import {
  CONFIG_KEY_DB_DIALECT,
  CONFIG_KEY_DB_HOST,
  CONFIG_KEY_DB_PASSWORD,
  CONFIG_KEY_DB_POOL_MAX_CONNECTION,
  CONFIG_KEY_DB_PORT,
  CONFIG_KEY_DB_SYNC,
  CONFIG_KEY_DB_USED_DATABASE,
  CONFIG_KEY_DB_USER,
  CONFIG_KEY_FLUENTD_HOST,
  CONFIG_KEY_FLUENTD_PORT,
  CONFIG_KEY_FLUENTD_SHARED_KEY,
  CONFIG_KEY_HTTP_SERVER_PORT,
  CONFIG_KEY_JWT_EXPIRES_IN,
  CONFIG_KEY_JWT_SECRET,
  CONFIG_KEY_NODE_ENV,
  CONFIG_KEY_SALT_ROUNDS,
  CONFIG_KEY_FLUENTD_TIMEOUT,
  CONFIG_KEY_FLUENTD_TAG,
} from './../config/config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  get NODE_ENV(): string {
    return this.configService.get<string>(CONFIG_KEY_NODE_ENV);
  }

  get HTTP_SERVER_PORT(): number {
    return this.configService.get<number>(CONFIG_KEY_HTTP_SERVER_PORT);
  }

  get DB_DIALECT(): string {
    return this.configService.get<string>(CONFIG_KEY_DB_DIALECT);
  }
  get DB_HOST(): string {
    return this.configService.get<string>(CONFIG_KEY_DB_HOST);
  }
  get DB_PORT(): number {
    return this.configService.get<number>(CONFIG_KEY_DB_PORT);
  }
  get DB_USER(): string {
    return this.configService.get<string>(CONFIG_KEY_DB_USER);
  }

  get HTTP_DB_PASSWORD(): string {
    return this.configService.get<string>(CONFIG_KEY_DB_PASSWORD);
  }
  get DB_USED_DATABASE(): string {
    return this.configService.get<string>(CONFIG_KEY_DB_USED_DATABASE);
  }

  get DB_POOL_MAX_CONNECTION(): string {
    return this.configService.get<string>(CONFIG_KEY_DB_POOL_MAX_CONNECTION);
  }

  get DB_SYNC(): boolean {
    return this.configService.get<boolean>(CONFIG_KEY_DB_SYNC);
  }

  get JWT_SECRET(): string {
    return this.configService.get<string>(CONFIG_KEY_JWT_SECRET);
  }

  get JWT_EXPIRES_IN(): string {
    return this.configService.get<string>(CONFIG_KEY_JWT_EXPIRES_IN);
  }

  get SALT_ROUNDS(): number {
    return this.configService.get<number>(CONFIG_KEY_SALT_ROUNDS);
  }

  get FLUENTD_HOST(): string {
    return this.configService.get<string>(CONFIG_KEY_FLUENTD_HOST);
  }

  get FLUENTD_PORT(): number {
    return this.configService.get<number>(CONFIG_KEY_FLUENTD_PORT);
  }

  get FLUENTD_TIMEOUT(): number {
    return this.configService.get<number>(CONFIG_KEY_FLUENTD_TIMEOUT);
  }

  get FLUENTD_TAG(): string {
    return this.configService.get<string>(CONFIG_KEY_FLUENTD_TAG);
  }

  get FLUENTD_SHARED_KEY(): string {
    return this.configService.get<string>(CONFIG_KEY_FLUENTD_SHARED_KEY);
  }
}
