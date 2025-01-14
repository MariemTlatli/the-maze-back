import { ApiProperty } from '@nestjs/swagger';
import { GetChallengeResponse } from './get-challenge.response';

export class GetChallengeWithScoreReponse extends GetChallengeResponse {
  @ApiProperty({
    description: 'Team score for this challenge',
  })
  score: number;
}
