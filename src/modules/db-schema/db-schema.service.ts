/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-06-09 14:06:08
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-06-09 14:15:30
 * @FilePath: /easy-front-gpt-api/src/modules/db-schema/db-schema.service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op, FindAndCountOptions, QueryTypes } from 'sequelize';
import { CacheService } from '@service/cache.service';
import { ConfigService } from '@nestjs/config';
import { OpenAiModel } from '@config/global';
import { OpenAiService } from '@service/openai.service';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';
import { HttpModule, HttpService } from '@nestjs/axios';

import { TestMySqlConnectDTO } from './db-schema.dto';

@Injectable()
export class DbSchemaService {
  constructor(
    @InjectConnection()
    private sequelize: Sequelize,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private cacheService: CacheService,
    private openAiService: OpenAiService,
  ) {}

  async testMysqlConnect(requestBody: TestMySqlConnectDTO): Promise<any> {
    const { db_config } = requestBody;
    const sequelize = new Sequelize({
      dialect: 'mysql',
      ...db_config,
    });

    await sequelize.authenticate();
    await sequelize.close();
  }
}
