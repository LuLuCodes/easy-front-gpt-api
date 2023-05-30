/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-10 02:34:58
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-05-30 10:49:17
 * @FilePath: /easy-front-gpt-api/src/modules/chat-gpt/chat-gpt.service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op, FindAndCountOptions, QueryTypes } from 'sequelize';
import { CacheService } from '@service/cache.service';
import { OpenAiService } from '@service/openai.service';
import { ConfigService } from '@nestjs/config';
import { OpenAiModel } from '@config/global';
import { ChatMessageDTO } from './chat-gpt.dto';
import * as _ from 'lodash';

@Injectable()
export class ChatGptService {
  constructor(
    private readonly configService: ConfigService,
    private cacheService: CacheService,
    private openAiService: OpenAiService,
  ) {}

  async listModels(): Promise<any> {
    return await this.openAiService.listModels();
  }

  async chatMessage(requestBody: ChatMessageDTO): Promise<any> {
    const { model, messages } = requestBody;
    const completionRequest = {
      model: model || OpenAiModel.gpt3,
      temperature: 0.2,
      max_tokens: 2000,
      // top_p: 1,
      messages,
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

  async chatMessageByStream(requestBody: ChatMessageDTO): Promise<any> {
    const { model, messages } = requestBody;
    const completionRequest = {
      model: model || OpenAiModel.gpt3,
      temperature: 0.2,
      max_tokens: 2000,
      // top_p: 1,
      messages,
      stream: true,
    };

    return await this.openAiService.createChatCompletionByStream({
      completionRequest,
    });
  }
}
