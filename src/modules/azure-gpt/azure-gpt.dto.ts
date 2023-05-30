/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-10 02:34:58
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-05-30 10:46:31
 * @FilePath: /easy-front-gpt-api/src/modules/azure-gpt/chatgpt.dto.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  IsDateString,
  Min,
  Max,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  IsEnum,
  Length,
  ValidateNested,
  MaxLength,
  MinLength,
  ArrayMaxSize,
  ArrayMinSize,
  IsEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QueryDTO, BaseDTO } from '@dto/BaseDTO';
import { ChatMessageRole, OpenAiModel } from '@config/global';

class ChatMessage {
  @ApiProperty({
    description: '角色',
    enum: ChatMessageRole,
    enumName: 'ChatMessageRole',
  })
  @IsEnum(ChatMessageRole, { message: 'Invalid message role' })
  readonly role: ChatMessageRole;

  @ApiProperty({
    description: '内容',
    type: String,
  })
  @IsNotEmpty({ message: 'content不能为空' })
  @IsString({ message: 'content必须为字符串' })
  readonly content: string;
}

export class ChatMessageDTO extends BaseDTO {
  @ApiPropertyOptional({
    description: '模型',
    enum: OpenAiModel,
    enumName: 'OpenAiModel',
    default: OpenAiModel.gpt3,
  })
  @IsOptional()
  @IsEnum(OpenAiModel, { message: 'Invalid OpenAI model' })
  readonly model?: OpenAiModel;

  @ApiProperty({
    description: 'OpenAI Chat消息',
    type: [ChatMessage],
  })
  @ValidateNested({ each: true })
  @Type(() => ChatMessage)
  @ArrayMinSize(1, { message: 'messages至少需要一条消息' })
  readonly messages: ChatMessage[];
}
