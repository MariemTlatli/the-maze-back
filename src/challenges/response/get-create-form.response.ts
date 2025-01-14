import { $Enums, Tech } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class DomainResponse {
  @ApiProperty({
    example: 1,
    description: 'Domain id',
  })
  id: number;

  @ApiProperty({
    example: 'domain1',
    description: 'Domain name',
  })
  name: string;
}
export class GetCreateChallengeFormResponse {
  @ApiProperty({
    example: $Enums.Tech.AI,
    description: 'List of technologies',
  })
  techs: Tech[];

  @ApiProperty({
    type: () => DomainResponse,
    description: 'List of domains',
  })
  domains: DomainResponse;
}
