/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-10 02:34:58
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-05-24 17:28:03
 * @FilePath: /easy-front-gpt-api/src/modules/api-schema/api-schema.service.ts
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
import * as _ from 'lodash';
import * as dayjs from 'dayjs';
import { HttpModule, HttpService } from '@nestjs/axios';
import { encryptPassword } from '@libs/cryptogram';
import { TDbConfig } from '@models/index';
import {
  GetCreateDtoClassSchemaDTO,
  GetCreateModuleClassSchemaDTO,
} from './api-schema.dto';

import { OpenAiService } from '@service/openai.service';

@Injectable()
export class ApiSchemaService {
  constructor(
    @InjectConnection()
    private sequelize: Sequelize,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private cacheService: CacheService,
    private openAiService: OpenAiService,
    @InjectModel(TDbConfig)
    private readonly tDbConfig: typeof TDbConfig,
  ) {}

  async getCreateDtoClassSchema(
    requestBody: GetCreateDtoClassSchemaDTO,
  ): Promise<any> {
    const { dto_prompt } = requestBody;
    const completionRequest = {
      model: OpenAiModel.gpt3,
      temperature: 0.2,
      max_tokens: 2000,
      messages: [
        { role: 'system', content: '你是一位NestJS开发工程师。' },
        {
          role: 'assistant',
          content: `请基于"class-transformer"和"@nestjs/swagger"，生成DTO类。`,
        },
        {
          role: 'assistant',
          content: `如果是查询类型的DTO，继承于"QueryDTO"，如果是操作类型的DTO，继承于"BaseDTO"。"QueryDTO"和"BaseDTO"都在"@dto/BaseDTO"中。`,
        },
        {
          role: 'user',
          content: dto_prompt,
        },
      ],
    };
    const completion = await this.openAiService.createChatCompletion({
      completionRequest,
    });
    const { choices } = completion;
    if (choices.length > 0) {
      return choices[0].message.content;
    }
    return '';
  }

  async getCreateModuleClassSchema(
    requestBody: GetCreateModuleClassSchemaDTO,
  ): Promise<any> {
    const { module_name } = requestBody;
    const completionRequest = {
      model: OpenAiModel.gpt3,
      temperature: 0.2,
      max_tokens: 2000,
      messages: [
        { role: 'system', content: '你是一位NestJS开发工程师。' },
        {
          role: 'assistant',
          content: `生成一个module class的代码，该module名字是"${module_name}"`,
        },
        {
          role: 'user',
          content: `该module引入了"@nestjs/axios"库的"HttpModule"模块，以及自定的"CacheService"，"CacheService"在"@service"目录下。同时自动引入该module对应的controller和service。`,
        },
      ],
    };
    const completion = await this.openAiService.createChatCompletion({
      completionRequest,
    });
    const { choices } = completion;
    if (choices.length > 0) {
      return choices[0].message.content;
    }
    return '';
  }
}
