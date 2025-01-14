import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';
export class SubmitChallengeDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  teamId: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  challengeId: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  score: number;

  @ApiProperty()
  @IsString()
  description: string;
}
