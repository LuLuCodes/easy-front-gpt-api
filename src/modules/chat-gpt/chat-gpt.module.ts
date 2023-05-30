/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-10 02:34:58
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-05-30 10:48:50
 * @FilePath: /easy-front-gpt-api/src/modules/chat-gpt/chat-gpt.module.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from '@nestjs/common';
import { ChatGptController } from './chat-gpt.controller';
import { ChatGptService } from './chat-gpt.service';
import { CacheService } from '@service/cache.service';
import { OpenAiService } from '@service/openai.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ChatGptController],
  providers: [ChatGptService, CacheService, OpenAiService],
})
export class ChatGptModule {}
