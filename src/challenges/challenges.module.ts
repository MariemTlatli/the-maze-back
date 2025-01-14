import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { PrismaService } from 'src/common/prisma.service';

@Module({
  controllers: [ChallengesController],
  providers: [ChallengesService, PrismaService],
})
export class ChallengesModule {}
