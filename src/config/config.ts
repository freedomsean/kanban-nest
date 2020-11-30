// Common Env
export const CONFIG_KEY_NODE_ENV = 'nodeEnv';

// HTTP Server
export const CONFIG_KEY_HTTP_SERVER_PORT = 'port';

export const CONFIG_KEY_DB_DIALECT = 'dbDialect';
export const CONFIG_KEY_DB_HOST = 'dbHost';
export const CONFIG_KEY_DB_PORT = 'dbPort';
export const CONFIG_KEY_DB_USER = 'dbUser';
export const CONFIG_KEY_DB_PASSWORD = 'dbPassword';
export const CONFIG_KEY_DB_USED_DATABASE = 'dbUsedDatabase';
export const CONFIG_KEY_DB_POOL_MAX_CONNECTION = 'dbPoolMaxConnection';
export const CONFIG_KEY_DB_SYNC = 'dbSync';

// Auth Config
export const CONFIG_KEY_JWT_SECRET = 'jwtSecret';
export const CONFIG_KEY_SALT_ROUNDS = 'saltRounds';
export const CONFIG_KEY_JWT_EXPIRES_IN = 'jwtExpiresIn';

// Fluentd Config
export const CONFIG_KEY_FLUENTD_HOST = 'fluentdHost';
export const CONFIG_KEY_FLUENTD_PORT = 'fluentdPort';
export const CONFIG_KEY_FLUENTD_TIMEOUT = 'fluentdTimeout';
export const CONFIG_KEY_FLUENTD_SHARED_KEY = 'fluentdShardKey';
export const CONFIG_KEY_FLUENTD_TAG = 'fluentdTag';

interface DBConfig {
  [CONFIG_KEY_DB_DIALECT]: string;
  [CONFIG_KEY_DB_HOST]: string;
  [CONFIG_KEY_DB_PORT]: number;
  [CONFIG_KEY_DB_USER]: string;
  [CONFIG_KEY_DB_PASSWORD]: string;
  [CONFIG_KEY_DB_USED_DATABASE]: string;
  [CONFIG_KEY_DB_POOL_MAX_CONNECTION]: number;
  [CONFIG_KEY_DB_SYNC]: boolean;
}

interface AuthConfig {
  [CONFIG_KEY_JWT_SECRET]: string;
  [CONFIG_KEY_JWT_EXPIRES_IN]: string;
  [CONFIG_KEY_SALT_ROUNDS]: number;
}

interface FluentdConfig {
  [CONFIG_KEY_FLUENTD_HOST]: string;
  [CONFIG_KEY_FLUENTD_PORT]: number;
  [CONFIG_KEY_FLUENTD_TIMEOUT]: number;
  [CONFIG_KEY_FLUENTD_SHARED_KEY]: string;
  [CONFIG_KEY_FLUENTD_TAG]: string;
}

export interface EnvObj extends DBConfig, AuthConfig, FluentdConfig {
  [CONFIG_KEY_NODE_ENV]: string;
  [CONFIG_KEY_HTTP_SERVER_PORT]: number;
}

export const Config = (): EnvObj => {
  const config = {
    [CONFIG_KEY_NODE_ENV]: process.env['NODE_ENV'],
    [CONFIG_KEY_HTTP_SERVER_PORT]: parseInt('PORT', 10) || 3000,
    [CONFIG_KEY_DB_DIALECT]: process.env['DB_DIALECT'],
    [CONFIG_KEY_DB_HOST]: process.env['DB_HOST'],
    [CONFIG_KEY_DB_PORT]: parseInt(process.env['DB_PORT']),
    [CONFIG_KEY_DB_USER]: process.env['DB_USER'],
    [CONFIG_KEY_DB_PASSWORD]: process.env['DB_PASSWORD'],
    [CONFIG_KEY_DB_USED_DATABASE]: process.env['DB_USED_DATABASE'],
    [CONFIG_KEY_DB_POOL_MAX_CONNECTION]: parseInt(
      process.env['DB_POOL_MAX_CONNECTION'],
    ),
    [CONFIG_KEY_DB_SYNC]: process.env['DB_SYNC'] === 'true',
    [CONFIG_KEY_JWT_SECRET]: process.env['JWT_SECRET'],
    [CONFIG_KEY_JWT_EXPIRES_IN]: process.env['JWT_EXPIRES_IN'],
    [CONFIG_KEY_SALT_ROUNDS]: parseInt(process.env['SALT_ROUNDS']),
    [CONFIG_KEY_FLUENTD_HOST]: process.env['FLUENTD_HOST'],
    [CONFIG_KEY_FLUENTD_PORT]: parseInt(process.env['FLUENTD_PORT']),
    [CONFIG_KEY_FLUENTD_TIMEOUT]: parseInt(process.env['FLUENTD_TIMEOUT']),
    [CONFIG_KEY_FLUENTD_SHARED_KEY]: process.env['FLUENTD_SHARED_KEY'],
    [CONFIG_KEY_FLUENTD_TAG]: process.env['FLUENTD_TAG'],
  };
  return config;
};
