/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-10 02:34:58
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-05-30 10:50:39
 * @FilePath: /easy-front-gpt-api/src/modules/azure-gpt/azure-gpt.service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op, FindAndCountOptions, QueryTypes } from 'sequelize';
import { CacheService } from '@service/cache.service';
import { MidjourneyService } from '@service/midjourney.service';
import { ConfigService } from '@nestjs/config';
import { OpenAiModel } from '@config/global';
import { CreateImageDTO } from './drawer.dto';
import * as _ from 'lodash';

@Injectable()
export class DrawerService {
  constructor(
    private readonly configService: ConfigService,
    private cacheService: CacheService,
    private midjourneyService: MidjourneyService,
  ) {}

  async createImage(requestBody: CreateImageDTO): Promise<any> {
    const {
      action,
      prompt,
      image_id,
      version,
      chaos,
      stylize,
      quality,
      aspect,
    } = requestBody;

    const imageRequest: any = {
      action,
    };
    if (action === 'generate') {
      if (!prompt) {
        throw new Error(`prompt can't be empty`);
      }
      imageRequest.prompt = `${prompt} --version ${version} --chaos ${chaos} --stylize ${stylize} --quality ${quality} --aspect ${aspect}`;
    }

    if (action !== 'generate') {
      if (!image_id) {
        throw new Error(`image_id can't be empty`);
      }
      imageRequest.image_id = image_id;
    }

    return await this.midjourneyService.createImage({
      imageRequest,
    });
  }
}