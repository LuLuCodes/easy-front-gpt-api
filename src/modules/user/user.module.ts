/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-22 16:56:28
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-04-11 18:58:15
 * @FilePath: /easy-front-gpt-api/src/modules/user/user.module.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CacheService } from '@service/cache.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [UserService, CacheService],
})
export class UserModule {}
