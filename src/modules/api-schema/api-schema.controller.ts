/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-22 17:31:29
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-04-11 16:56:31
 * @FilePath: /easy-front-gpt-api/src/modules/api-schema/api-schema.controller.ts
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
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { ValidationPipe } from '@pipe/validation.pipe';
import { CacheService } from '@service/cache.service';
import { ApiSchemaService } from './api-schema.service';

import {
  GetCreateDtoClassSchemaDTO,
  GetCreateModuleClassSchemaDTO,
} from './api-schema.dto';

@ApiTags('Api Schema API')
@ApiHeader({
  name: 'x-from-swagger',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('api-schema')
export class ApiSchemaController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly apiSchemaService: ApiSchemaService,
  ) {}

  @ApiOperation({
    summary: '获取创建DTO Class的schema',
    description: '获取创建DTO Class的schema',
  })
  @ApiBody({
    description: '请求参数',
    type: GetCreateDtoClassSchemaDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-create-dto-class-schema')
  async getCreateDtoClassSchema(
    @Body() body: GetCreateDtoClassSchemaDTO,
  ): Promise<any> {
    const response = await this.apiSchemaService.getCreateDtoClassSchema(body);
    return response;
  }

  @ApiOperation({
    summary: '获取创建Module Class的schema',
    description: '获取创建Module Class的schema',
  })
  @ApiBody({
    description: '请求参数',
    type: GetCreateModuleClassSchemaDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-create-module-class-schema')
  async getCreateModuleClassSchema(
    @Body() body: GetCreateModuleClassSchemaDTO,
  ): Promise<any> {
    const response = await this.apiSchemaService.getCreateModuleClassSchema(
      body,
    );
    return response;
  }
}
