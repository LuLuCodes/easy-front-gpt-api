/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-04-07 17:01:31
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-05-30 10:44:26
 * @FilePath: /easy-front-gpt-api/src/service/azure-openai.service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HttpService } from '@nestjs/axios';
import { AzureOpenAiModel } from '@config/global';

@Injectable()
export class AzureOpenAiService {
  private readonly open_api_key = '';
  private readonly open_api_end_point = '';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.open_api_key = this.configService.get('azure_openai.open_api_key');
    this.open_api_end_point = this.configService.get(
      'azure_openai.open_api_end_point',
    );
  }

  async createChatCompletion({
    completionRequest,
  }: {
    completionRequest: any;
  }): Promise<any> {
    const { model, stream, ...otherCompletionRequest } = completionRequest;
    if (stream) {
      throw new Error("stream isn't supported");
    }
    const api_verison = AzureOpenAiModel[model];
    const response = await this.httpService.axiosRef.post(
      `${this.open_api_end_point}/openai/deployments/chatgpt/chat/completions?api-version=${api_verison}`,
      otherCompletionRequest,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.open_api_key,
        },
      },
    );
    return response.data;
  }

  async createChatCompletionByStream({
    completionRequest,
  }: {
    completionRequest: any;
  }): Promise<any> {
    const { model, ...otherCompletionRequest } = completionRequest;
    const api_verison = AzureOpenAiModel[model];
    const response = await this.httpService.axiosRef.post(
      `${this.open_api_end_point}/openai/deployments/chatgpt/chat/completions?api-version=${api_verison}`,
      otherCompletionRequest,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.open_api_key,
        },
        responseType: 'stream',
      },
    );
    return response.data;
  }
}
