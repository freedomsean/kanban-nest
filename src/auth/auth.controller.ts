import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { EnvService } from '../env/env.service';
import { PassportService } from '../utils/passport.service';
import { LoginDto } from '../users/users.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private envService: EnvService,
    private usersService: UsersService,
  ) {}

  @HttpCode(200)
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    try {
      const user = await this.usersService.login(dto);
      const token = PassportService.sign(
        { id: user.id, username: user.username },
        this.envService.JWT_SECRET,
        this.envService.JWT_EXPIRES_IN,
      );
      return {
        tokenType: 'Bearer',
        token,
        user: {
          id: user.id,
          username: dto.username,
        },
        defaultKanbanId: user.defaultKanban.id,
        kanbans: user.usersKanbans.map((kanban) => ({
          id: kanban.kanbanId,
        })),
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
