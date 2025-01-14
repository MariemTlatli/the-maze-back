import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ToggleFreezeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'jarib zahrik',
  })
  secret: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: 'boolean',
  })
  isFrozen: boolean;
}
