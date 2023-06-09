/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-03-22 17:13:38
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2023-06-09 14:18:38
 * @FilePath: /easy-front-gpt-api/src/modules/db-schema/db-schema.dto.ts
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

export class MySqlConnectConfig {
  @ApiProperty({
    description: '数据库主机IP',
    type: String,
  })
  @IsNotEmpty({ message: 'host不能为空' })
  @IsString({ message: 'host必须为字符串' })
  readonly host: string;

  @ApiProperty({
    description: '数据库主机端口号',
    type: Number,
  })
  @IsInt({ message: 'port必须是整数' })
  @Min(1, { message: 'port必须大于0' })
  readonly port: number;

  @ApiProperty({
    description: '数据库名称',
    type: String,
  })
  @IsNotEmpty({ message: 'database不能为空' })
  @IsString({ message: 'database必须为字符串' })
  readonly database: string;

  @ApiProperty({
    description: '数据库用户名',
    type: String,
  })
  @IsNotEmpty({ message: 'username不能为空' })
  @IsString({ message: 'username必须为字符串' })
  readonly username: string;

  @ApiProperty({
    description: '数据库密码',
    type: String,
  })
  @IsNotEmpty({ message: 'password不能为空' })
  @IsString({ message: 'password必须为字符串' })
  readonly password: string;
}

export class MySqlConnectDTO extends BaseDTO {
  @ApiProperty({
    description: '数据库连接配置',
    type: MySqlConnectConfig,
  })
  @ValidateNested({ each: true })
  @Type(() => MySqlConnectConfig)
  readonly db_config: MySqlConnectConfig;
}
