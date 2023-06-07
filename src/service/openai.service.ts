/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-04-07 17:01:31
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-05-24 17:26:32
 * @FilePath: /easy-front-gpt-api/src/service/openai.service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

import { HttpService } from '@nestjs/axios';
import { OpenAiModel } from '@config/global';

@Injectable()
export class OpenAiService {
  private readonly openai: OpenAIApi;
  private readonly openai_api_key = '';
  private readonly openai_api_end_point = '';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.openai_api_key = this.configService.get('openai.openai_api_key');
    this.openai_api_end_point = this.configService.get(
      'openai.openai_api_end_point',
    );
    const configuration = new Configuration({
      apiKey: this.openai_api_key,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async listModels() {
    const models = await this.openai.listModels();
    return models.data;
  }

  async createChatCompletion({
    completionRequest,
  }: {
    completionRequest: any;
  }): Promise<any> {
    const { stream } = completionRequest;
    if (stream) {
      throw new Error("stream isn't supported");
    }

    const completion = await this.openai.createChatCompletion(
      completionRequest,
      {
        timeout: 120000,
      },
    );
    return completion.data;
  }

  async createChatCompletionByStream({
    completionRequest,
  }: {
    completionRequest: any;
  }): Promise<any> {
    const response = await this.httpService.axiosRef.post(
      `${this.openai_api_end_point}/v1/chat/completions`,
      completionRequest,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.openai_api_key}`,
        },
        responseType: 'stream',
      },
    );
    return response.data;
  }
}
