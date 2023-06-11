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
import { DbSchemaService } from './db-schema.service';

import { MySqlConnectDTO, GetTableStructureBatchDTO } from './db-schema.dto';

@ApiTags('DB Schema API')
@ApiHeader({
  name: 'x-from-swagger',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('db-schema')
export class DbSchemaController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly dbSchemaService: DbSchemaService,
  ) {}

  @ApiOperation({
    summary: '测试MySql连接',
    description: '测试MySql连接',
  })
  @ApiBody({
    description: '请求参数',
    type: MySqlConnectDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('test-mysql-connect')
  async testMysqlConnect(@Body() body: MySqlConnectDTO): Promise<any> {
    const response = await this.dbSchemaService.testMysqlConnect(body);
    return response;
  }

  @ApiOperation({
    summary: '获取数据库表名',
    description: '获取数据库表名',
  })
  @ApiBody({
    description: '请求参数',
    type: MySqlConnectDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-table-name')
  async getTables(@Body() body: MySqlConnectDTO): Promise<any> {
    const response = await this.dbSchemaService.getTableName(body);
    return response;
  }

  @ApiOperation({
    summary: '批量获取数据库表结构',
    description: '批量获取数据库表结构',
  })
  @ApiBody({
    description: '请求参数',
    type: GetTableStructureBatchDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('get-table-structure-batch')
  async getTableStructureBatch(
    @Body() body: GetTableStructureBatchDTO,
  ): Promise<any> {
    const response = await this.dbSchemaService.getTableStructureBatch(body);
    return response;
  }
}
