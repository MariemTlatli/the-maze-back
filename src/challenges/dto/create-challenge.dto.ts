import { $Enums } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export default class CreateChallengeDto {
  @ApiProperty({
    example: 'Challenge Name',
    description: 'The name of the challenge',
  })
  @IsString()
  name: string;

  @ApiProperty({ example: 1, description: 'The number of the challenge' })
  @IsNumber()
  number: number;

  @ApiProperty({ example: 100, description: 'The points of the challenge' })
  @IsNumber()
  points: number;

  @ApiProperty({
    example: 'Challenge Description',
    description: 'The description of the challenge',
  })
  @IsString()
  description: string;

  @ApiProperty({
    enum: $Enums.Tech,
    example: $Enums.Tech.WEB,
    description: 'The tech of the challenge',
  })
  @IsEnum($Enums.Tech)
  @IsOptional()
  tech: $Enums.Tech;

  @IsOptional()
  @ApiProperty({
    example: 'key',
    description: 'The key of the challenge',
  })
  @IsString()
  key?: string;

  @IsOptional()
  @ApiProperty({
    example: 'hint',
    description: 'hint to get the challenge key',
  })
  hint?: string;

  @ApiProperty({ example: 1, description: 'The domain ID of the challenge' })
  @IsNumber()
  @IsOptional()
  domaineId: number;
}
