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

export class UserLoginDTO extends BaseDTO {
  @ApiProperty({
    description: '账号，可以是手机号、用户名、email',
    type: String,
  })
  @IsNotEmpty({ message: '账号不能为空' })
  @IsString({ message: '账号必须为字符串' })
  readonly account: string;

  @ApiProperty({
    description: '密码',
    type: String,
    maxLength: 8,
    minLength: 20,
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须为字符串' })
  @Length(8, 20, { message: '密码长度8~20' })
  readonly password: string;
}
