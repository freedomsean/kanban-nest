import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { EnvService } from '../env/env.service';
import { User } from '../users/users.entity';
import { PassportService } from '../utils/passport.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly envService: EnvService,
    private readonly databaseService: DatabaseService,
    private readonly excludes: (RegExp | string)[],
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<{
      path: string;
      headers: { [key: string]: string };
      user: {
        id: string;
      };
    }>();

    for (const exclude of this.excludes) {
      if (req.path.match(exclude)) {
        return true;
      }
    }

    // The name of header field is case sensitive.
    const authorization =
      req.headers['Authorization'] ?? req.headers['authorization'];
    if (!authorization) {
      return false;
    }

    const token = authorization.replace(/Bearer\s+/i, '');
    const payload: { subject: string } = PassportService.verify(
      token,
      this.envService.JWT_SECRET,
    );

    if (!payload.subject) {
      return false;
    }

    const user = await this.databaseService
      .getRepository(User)
      .findOne(payload.subject, {
        where: {
          isDeleted: false,
        },
      });

    if (!user) {
      return false;
    }

    req.user.id = user.id;
    return true;
  }
}
