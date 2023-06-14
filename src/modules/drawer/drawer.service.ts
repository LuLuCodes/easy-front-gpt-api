/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-10 02:34:58
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-06-14 13:33:22
 * @FilePath: /easy-front-gpt-api/src/modules/drawer/drawer.service.ts
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
  private readonly midjourney_callback_url = '';
  constructor(
    private readonly configService: ConfigService,
    private cacheService: CacheService,
    private midjourneyService: MidjourneyService,
  ) {
    this.midjourney_callback_url = this.configService.get(
      'midjourney.midjourney_callback_url',
    );
  }

  private getMidjourneyPrompt(requestBody: CreateImageDTO) {
    const {
      action,
      prompt,
      image_id,
      version,
      chaos,
      stylize,
      quality,
      aspect,
      niji,
      iw,
    } = requestBody;

    let quality_str = `${quality}` || '1';
    quality_str = quality_str.replace('0', '');

    const imageRequest: any = {
      action,
    };
    if (action === 'generate') {
      if (!prompt) {
        throw new Error(`prompt can't be empty`);
      }
      if (version && !niji) {
        imageRequest.prompt = `${prompt} --version ${version} --chaos ${chaos} --stylize ${stylize} --quality ${quality_str} --aspect ${aspect} --iw ${iw}`;
      }
      if (niji) {
        imageRequest.prompt = `${prompt} --chaos ${chaos} --stylize ${stylize} --quality ${quality_str} --aspect ${aspect} --niji ${niji}`;
      }
    }
    if (action !== 'generate') {
      if (!image_id) {
        throw new Error(`image_id can't be empty`);
      }
      imageRequest.image_id = image_id;
    }
    if (this.midjourney_callback_url) {
      imageRequest.callback_url = this.midjourney_callback_url;
    }
    return imageRequest;
  }

  async createImage(requestBody: CreateImageDTO): Promise<any> {
    const imageRequest = this.getMidjourneyPrompt(requestBody);
    return await this.midjourneyService.createImage({
      imageRequest,
    });
  }

  async createImageByStream(requestBody: CreateImageDTO): Promise<any> {
    const imageRequest = this.getMidjourneyPrompt(requestBody);
    return await this.midjourneyService.createImageByStream({
      imageRequest,
    });
  }
}
