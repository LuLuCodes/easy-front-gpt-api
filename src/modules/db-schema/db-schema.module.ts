/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-04-11 15:46:38
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-04-11 15:47:14
 * @FilePath: /easy-front-gpt-api/src/modules/api-schema/api-schema.module.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from '@nestjs/common';
import { DbSchemaController } from './db-schema.controller';
import { DbSchemaService } from './db-schema.service';
import { CacheService } from '@service/cache.service';
import { OpenAiService } from '@service/openai.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [DbSchemaController],
  providers: [DbSchemaService, CacheService, OpenAiService],
})
export class DbSchemaModule {}