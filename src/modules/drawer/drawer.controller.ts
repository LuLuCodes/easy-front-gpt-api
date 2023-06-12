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
import { DrawerService } from './drawer.service';

import { CreateImageDTO } from './drawer.dto';

@ApiTags('Drawer API')
@ApiHeader({
  name: 'x-from-swagger',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('drawer')
export class DrawerController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly drawerService: DrawerService,
  ) {}

  @ApiOperation({
    summary: '作图',
    description: '作图',
  })
  @ApiBody({
    description: '请求参数',
    type: CreateImageDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('create-image')
  async createImage(@Body() body: CreateImageDTO): Promise<any> {
    return await this.drawerService.createImage(body);
  }
}
