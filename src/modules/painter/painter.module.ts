/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-10 02:34:58
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-05-30 10:50:02
 * @FilePath: /easy-front-gpt-api/src/modules/azure-gpt/azure-gpt.module.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from '@nestjs/common';
import { PainterController } from './painter.controller';
import { PainterService } from './painter.service';
import { CacheService } from '@service/cache.service';
import { MidjourneyService } from '@service/midjourney.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PainterController],
  providers: [PainterService, CacheService, MidjourneyService],
})
export class PainterModule {}
