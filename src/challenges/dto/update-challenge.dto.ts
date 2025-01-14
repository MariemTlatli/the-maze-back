import { PartialType } from '@nestjs/swagger';
import { SubmitChallengeDto } from './submit-challenge.dto';

export class UpdateChallengeDto extends PartialType(SubmitChallengeDto) {}
