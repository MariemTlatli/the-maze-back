import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Tech } from '@prisma/client';
export class GetChallengeResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 10 })
  number: number;

  @ApiProperty({ example: 'Challenge Name' })
  name: string;

  @ApiProperty({ example: 100 })
  points: number;

  @ApiProperty({ example: 'Challenge Description' })
  description: string;

  @ApiProperty({ example: $Enums.Tech.AI })
  tech: Tech;
}
