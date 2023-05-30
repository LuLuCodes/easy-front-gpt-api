import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Param,
  UsePipes,
  Session,
  Headers,
  Response,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { ValidationPipe } from '@pipe/validation.pipe';
import { CatchError } from '@decorator/catch.decorator';
import { CacheService } from '@service/cache.service';
import { UserService } from './user.service';
import { md5 } from '@libs/cryptogram';
import { UserLoginDTO } from './user.dto';

@ApiTags('用户API')
@ApiHeader({
  name: 'x-from-swagger',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('user')
export class UserController {
  private cookie_key = '';
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.cookie_key = this.configService.get('session.key');
  }

  @ApiOperation({
    summary: '登录',
    description: '登录',
  })
  @ApiBody({
    description: '请求参数',
    type: UserLoginDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('login')
  async login(@Session() session, @Body() body: UserLoginDTO): Promise<any> {
    const user = await this.userService.login(body);
    const { account_code, ...user_data } = user;

    const token_str = `${this.cookie_key}${JSON.stringify({
      id: user_data.id,
      code: account_code,
    })}${this.cookie_key}`;
    const authToken = md5(token_str).toString();

    user_data.token = authToken;
    session.authToken = authToken;
    session.user = { code: account_code, ...user_data };
    return { code: account_code, ...user_data };
  }

  @ApiOperation({
    summary: '获取session',
    description: '获取session',
  })
  @ApiBody({
    description: '请求参数',
    type: Object,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-session')
  async getSession(@Session() session): Promise<any> {
    const { user, authToken } = session;
    if (!user) {
      return null;
    }

    const user_data = await this.userService.getSession(user);
    if (!user_data.enabled) {
      user.enabled = user_data.enabled;
      return { ...user };
    }

    return { ...user, token: authToken };
  }

  @ApiOperation({
    summary: '退出登录',
    description: '退出登录',
  })
  @ApiBody({
    description: '请求参数',
    type: Object,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('logout')
  async logout(@Session() session): Promise<any> {
    session.user = undefined;
    session.authToken = undefined;
    return;
  }
}
