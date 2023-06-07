/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-13 16:46:44
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-05-23 13:19:11
 * @FilePath: /easy-front-gpt-api/src/config/openai.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { envNumber, env } from '@libs/env-unit';
import { registerAs } from '@nestjs/config';

export default registerAs('azure_openai', () => ({
  openai_api_key: env('AZURE_OPENAI_API_KEY', ''),
  openai_api_end_point: env(
    'AZURE_OPENAI_API_END_POINT',
    'https://lulucode-gpt.openai.azure.com',
  ),
}));
