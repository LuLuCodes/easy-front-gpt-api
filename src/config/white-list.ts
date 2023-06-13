/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-10 02:34:58
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-06-03 15:40:21
 * @FilePath: /easy-front-gpt-api/src/config/white-list.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { registerAs } from '@nestjs/config';

export default registerAs('while_list', () => ({
  token: [
    '/api/oss/upload-oss',
    '/api/user/login',
    '/api/user/get-session',
    '/api/drawer/create-image-callback',
  ],
  sign: ['/api/oss/upload-oss', '/api/drawer/create-image-callback'],
}));
