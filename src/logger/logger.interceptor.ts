import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LoggerService } from './logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private loggerService: LoggerService) {}

  private log(
    err: { response: { statusCode: number } },
    req: {
      path: string;
      headers: { [key: string]: string };
      body: any;
      params: { [key: string]: string };
      query: { [key: string]: string };
      user: {
        id: string;
      };
    },
    res: {
      statusCode: any;
    },
    responseData: any,
  ) {
    const func = err
      ? this.loggerService.error.bind(this.loggerService)
      : this.loggerService.info.bind(this.loggerService);

    func({
      request: {
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query,
        user: req.user,
        path: req.path,
      },
      response: {
        statusCode: err ? err.response.statusCode : res.statusCode,
        error: err,
        responseData,
      },
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<any>();
    const res = ctx.getResponse<any>();

    return next.handle().pipe(
      catchError((err) => {
        this.log(err, req, res, err);
        return throwError(err);
      }),
      map((data) => {
        this.log(undefined, req, res, data);
        return { data };
      }),
    );
  }
}
