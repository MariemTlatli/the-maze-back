import { ApiProperty } from '@nestjs/swagger';
import { GetChallengeWithScoreReponse } from './get-challenge-with-score.response';

export class getChallengesByTeamResponse {
  @ApiProperty({
    description: 'Team id',
  })
  id: string;

  @ApiProperty({
    description: 'Team name',
  })
  name: string;

  @ApiProperty({
    description: 'Team Total score',
  })
  score: number;

  @ApiProperty({
    type: () => [GetChallengeWithScoreReponse],
  })
  challenges: GetChallengeWithScoreReponse[];
}
