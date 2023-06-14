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

  @ApiPropertyOptional({
    description: 'midjourney版本',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'version必须为必须为有效整数' })
  @Min(1, { message: 'version应大于等于1' })
  readonly version = 5;

  @ApiPropertyOptional({
    description: 'midjourney二次元',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'niji必须为必须为有效整数' })
  @Min(0, { message: 'niji应大于等于0' })
  readonly niji = 5;

  @ApiPropertyOptional({
    description:
      'midjourney混乱值，高混乱值将产生更多不寻常和意想不到的结果和组合。较低的混乱值具有更可靠、可重复的结果。',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'chaos必须为必须为有效整数' })
  @Min(0, { message: 'chaos应大于等于0' })
  @Max(100, { message: 'chaos应小于等于100' })
  readonly chaos = 0;

  @ApiPropertyOptional({
    description:
      'midjourney风格化，低风格化值生成的图像与提示非常匹配，但艺术性较差。高风格化值创建的图像非常具有艺术性，但与提示的联系较少',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'stylize必须为必须为有效整数' })
  @Min(0, { message: 'stylize应大于等于0' })
  @Max(1000, { message: 'stylize应小于等于100' })
  readonly stylize = 100;

  @ApiPropertyOptional({
    description: 'midjourney质量',
    type: Number,
  })
  @IsOptional()
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 2,
    },
    { message: 'quality必须是数字，最多2位小数' },
  )
  readonly quality = 1;

  @ApiPropertyOptional({
    description: 'midjourney图片权重，以图生图中，权重越大，越接近原图',
    type: Number,
  })
  @IsOptional()
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 2,
    },
    { message: 'quality必须是数字，最多2位小数' },
  )
  readonly iw = 1;

  @ApiPropertyOptional({
    description: '图片比例',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'aspect必须为字符串' })
  readonly aspect: string = '1:1';
}
