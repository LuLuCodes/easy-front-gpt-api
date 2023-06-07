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

export class CreateImageDTO extends BaseDTO {
  @ApiProperty({
    description:
      '操作类型。在第一次生成预览图时，需要指定该值为 generate，并填入 prompt 字段。在后续需要对图像进行处理时，可以设置为第一次生成结果的返回值中的 actions 的任一值，代表待处理图像的操作类型。该值默认为 generate',
    type: String,
  })
  @IsNotEmpty({ message: 'action不能为空' })
  @IsString({ message: 'action必须为字符串' })
  readonly action: string;

  @ApiPropertyOptional({
    description:
      '图像描述。在第一次生成预览图时，需要指定该字段，代表待生成图像的描述。建议用英文',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'prompt必须为字符串' })
  readonly prompt: string;

  @ApiPropertyOptional({
    description:
      '图像 ID。在第一次生成预览图时，不需要指定该字段。在后续需要对图像进行处理时，需要指定该字段，代表待处理图像的 ID。该 ID 即为第一次生成预览图时返回的 image_id 字段',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'image_id必须为字符串' })
  readonly image_id: string;
}
