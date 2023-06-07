/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-10 02:34:58
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-06-03 16:20:25
 * @FilePath: /easy-front-gpt-api/src/modules/user/user.service.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op, FindAndCountOptions, QueryTypes } from 'sequelize';
import { CacheService } from '@service/cache.service';
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';
import { HttpModule, HttpService } from '@nestjs/axios';
import { CacheKey } from '@config/global';
import { encryptPassword } from '@libs/cryptogram';
import { TAccount } from '@models/index';
import { UserLoginDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private cacheService: CacheService,
    @InjectModel(TAccount)
    private readonly tAccount: typeof TAccount,
  ) {}

  async login(requestBody: UserLoginDTO): Promise<any> {
    const { account, password } = requestBody;
    const user = await this.tAccount.findOne<any>({
      attributes: [
        'id',
        'account_code',
        'email',
        'phone',
        'username',
        'nick_name',
        'password',
        'password_salt',
        'enabled',
      ],
      where: {
        [Op.or]: {
          email: account,
          phone: account,
          username: account,
        },
      },
      raw: true,
    });
    if (!user) {
      throw new Error(`账号 ${account} 不存在！`);
    }

    if (user && user.enabled === 0) {
      throw new Error(`账号 ${account} 已禁用！`);
    }

    const pwd = encryptPassword(password, user.password_salt);
    if (pwd !== user.password) {
      throw new Error('密码错误，请重新输入！');
    }

    await this.tAccount.update(
      {
        last_login_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        updated_by: user.id,
      },
      {
        where: {
          id: user.id,
        },
      },
    );
    delete user.password_salt;
    delete user.password;
    return user;
  }

  async getSession(user: any): Promise<any> {
    const user_row = await this.tAccount.findOne({
      attributes: ['id', 'enabled'],
      where: {
        id: user.id,
      },
      raw: true,
    });
    return user_row;
  }
}
