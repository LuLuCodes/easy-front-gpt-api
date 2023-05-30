/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-10 02:34:58
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-05-30 09:53:05
 * @FilePath: /easy-front-gpt-api/src/config/global.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
export enum ResponseCode {
  OK = 0,
  PARM_ERROR = 1000,
  SIGN_ERROR = 1001,
  SYS_ERROR = 9999,
  UNKOWN_ERROR = 10000,
}

export enum CacheKey {
  SESSION_USER = 'SESSION_USER',
}

export enum ChatMessageRole {
  System = 'system',
  User = 'user',
  Assistant = 'assistant',
}

export enum OpenAiModel {
  gpt4 = 'gpt-4',
  gpt3 = 'gpt-3.5-turbo',
}

export enum AzureOpenAiModel {
  'gpt-4' = '2023-03-15-preview',
  'gpt-3.5-turbo' = '2023-03-15-preview',
}
