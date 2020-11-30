import { EnvService } from './../env/env.service';
import * as winston from 'winston';
import { Logger } from 'winston';
import * as fluentNodeLogger from 'fluent-logger';
import * as os from 'os';

export class LoggerService {
  private logger: Logger;

  constructor(private envService: EnvService) {
    const transports =
      this.envService.NODE_ENV === 'test'
        ? [new winston.transports.Console()]
        : [
            new (fluentNodeLogger.support.winstonTransport())(
              this.envService.FLUENTD_TAG,
              {
                host: this.envService.FLUENTD_HOST,
                port: this.envService.FLUENTD_PORT,
                timeout: this.envService.FLUENTD_TIMEOUT,
                requireAckResponse: false,
                security: {
                  clientHostname: os.hostname(),
                  sharedKey: this.envService.FLUENTD_SHARED_KEY,
                },
              },
            ),
          ];

    this.logger = winston.createLogger({
      transports,
    });
  }

  /**
   * Add info into log.
   *
   * @param {any} message - Message.
   */
  info(message: any) {
    this.logger.info(message);
  }

  /**
   * Add error into log.
   *
   * @param {any} message - Message.
   */
  error(message: any) {
    this.logger.error(message);
  }

  /**
   * End the logger.
   */
  end(): Promise<void> {
    return new Promise((resolve) => {
      this.logger.end(() => {
        resolve();
      });
    });
  }
}
