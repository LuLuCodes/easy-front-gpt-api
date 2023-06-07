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

import { HttpService } from '@nestjs/axios';

@Injectable()
export class MidjourneyService {
  private readonly midjourney_api_key = '';
  private readonly midjourney_api_end_point = '';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.midjourney_api_key = this.configService.get(
      'midjourney.midjourney_api_key',
    );
    this.midjourney_api_end_point = this.configService.get(
      'midjourney.midjourney_api_end_point',
    );
  }

  async createImage({ imageRequest }: { imageRequest: any }): Promise<any> {
    const response = await this.httpService.axiosRef.post(
      `${this.midjourney_api_end_point}?token=${this.midjourney_api_key}`,
      { ...imageRequest, timeout: 600 },
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        timeout: 60000,
      },
    );
    return response.data;
  }
}
