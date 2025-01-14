import { ApiProperty } from '@nestjs/swagger';
import { TeamResponse } from 'src/registration/responses/registrationForm.response';
import { GetChallengeResponse } from './get-challenge.response';

export class GetChallengesFormResponse {
  @ApiProperty({
    type: () => [TeamResponse],
  })
  teams: TeamResponse[];

  @ApiProperty({
    type: () => [GetChallengeResponse],
  })
  challenges: GetChallengeResponse[];
}
