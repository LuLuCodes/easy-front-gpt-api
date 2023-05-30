/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-22 17:13:38
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-04-11 17:00:06
 * @FilePath: /easy-front-gpt-api/src/modules/api-schema/api-schema.dto.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
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
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QueryDTO, BaseDTO } from '@dto/BaseDTO';

export class GetCreateDtoClassSchemaDTO extends BaseDTO {
  @ApiProperty({
    description: 'dto提示词',
    type: String,
  })
  @IsNotEmpty({ message: 'dto_prompt不能为空' })
  @IsString({ message: 'dto_prompt必须为字符串' })
  readonly dto_prompt: string;
}

export class GetCreateModuleClassSchemaDTO extends BaseDTO {
  @ApiProperty({
    description: 'module名字',
    type: String,
  })
  @IsNotEmpty({ message: 'module_name不能为空' })
  @IsString({ message: 'module_name必须为字符串' })
  readonly module_name: string;
}
