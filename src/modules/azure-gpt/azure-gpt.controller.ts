/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-10 02:34:58
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-05-30 10:54:00
 * @FilePath: /easy-front-gpt-api/src/modules/azure-gpt/azure-gpt.controller.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
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
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { ValidationPipe } from '@pipe/validation.pipe';
import { CacheService } from '@service/cache.service';
import { AzureGptService } from './azure-gpt.service';

import { ChatMessageDTO } from './azure-gpt.dto';

@ApiTags('AzureGpt API')
@ApiHeader({
  name: 'x-from-swagger',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('azure-gpt')
export class AzureGptController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly azureGptService: AzureGptService,
  ) {}

  @ApiOperation({
    summary: '发送消息',
    description: '发送消息',
  })
  @ApiBody({
    description: '请求参数',
    type: ChatMessageDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('chat-message-by-stream')
  async chatMessageByStream(
    @Res() res: Response,
    @Body() body: ChatMessageDTO,
  ): Promise<any> {
    const stream = await this.azureGptService.chatMessageByStream(body);
    stream.pipe(res);
  }
}