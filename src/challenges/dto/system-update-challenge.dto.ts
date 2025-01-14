import { PartialType } from '@nestjs/swagger';
import CreateChallengeDto from './create-challenge.dto';
import { IsNumber } from 'class-validator';

export default class SystemUpdateChallengeDto extends PartialType(
  CreateChallengeDto,
) {
  @IsNumber()
  id: number;
}
