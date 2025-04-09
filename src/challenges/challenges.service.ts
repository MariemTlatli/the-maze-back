import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/common/prisma.service';
import { SubmitChallengeDto } from './dto/submit-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import CreateChallengeDto from './dto/create-challenge.dto';
import SystemUpdateChallengeDto from './dto/system-update-challenge.dto';
import { $Enums, Prisma } from '@prisma/client';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ToggleFreezeDto } from './dto/toggle-freeze.dto';

@ApiTags('Challenges')
@Injectable()
export class ChallengesService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async systemToggleFreeze(toggleFreezeDto: ToggleFreezeDto) {
    const secret = process.env.FREEZE_SECRET;
    if (!toggleFreezeDto.secret || toggleFreezeDto.secret !== secret)
      throw new BadRequestException('Invalid secret');

    await this.prismaService.controle.update({
      where: {
        id: 1,
      },
      data: {
        isFrozen: toggleFreezeDto.isFrozen,
      },
    });
    console.log('frozen', toggleFreezeDto.isFrozen);
    await this.refreshCache();
  }

  async getLeaderboardState() {
    const result = await this.prismaService.controle.findFirst();
    return result;
  }

  async getAdminLeaderboard() {
    const result = await this.prismaService.team.findMany({
      select: {
        id: true,
        name: true,
        challenges: {
          select: {
            score: true,
            description: true,
            challenge: {
              select: {
                id: true,
                number: true,
                name: true,
                points: true,
              },
            },
          },
        },
      },
    });

    return result.map((team) => {
      return {
        id: team.id,
        name: team.name,
        score: team.challenges.reduce((acc, curr) => acc + curr.score, 0),
        challenges: team.challenges.map((challenge) => {
          return {
            id: challenge.challenge.id,
            number: challenge.challenge.number,
            name: challenge.challenge.name,
            points: challenge.challenge.points,
            score: challenge.score,
            description: challenge.description,
          };
        }),
      };
    });
  }

  async create(submitChallengeDto: SubmitChallengeDto) {
    //check if submitted score is greater than challenge points
    await this.validateScore(
      submitChallengeDto.challengeId,
      submitChallengeDto.score,
    );

    await this.refreshCache();

    return await this.prismaService.challengesByTeam.create({
      data: submitChallengeDto,
    });
  }

  async update(updateChallengeDto: UpdateChallengeDto) {
    const { challengeId, teamId, ...rest } = updateChallengeDto;
    const submittedChallenge =
      await this.prismaService.challengesByTeam.findUnique({
        where: {
          teamId_challengeId: {
            challengeId,
            teamId,
          },
        },
        select: {
          teamId: true,
        },
      });
    if (!submittedChallenge)
      throw new NotFoundException('Challenge Submission not found');
    //check if submitted score is greater than challenge points
    await this.validateScore(challengeId, rest.score);
    await this.refreshCache();

    return await this.prismaService.challengesByTeam.update({
      where: {
        teamId_challengeId: {
          challengeId,
          teamId,
        },
      },
      data: rest,
    });
  }

  async remove(challengeId: number, teamId: string) {
    await this.refreshCache();

    return await this.prismaService.challengesByTeam.delete({
      where: {
        teamId_challengeId: {
          challengeId,
          teamId,
        },
      },
    });
  }

  async getForm() {
    const teams = await this.prismaService.team.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    const challenges = await this.prismaService.challenge.findMany({
      select: {
        id: true,
        name: true,
        number: true,
        points: true,
        description: true,
      },
    });

    return {
      teams,
      challenges,
    };
  }

  async validateScore(challengeId: number, score: number) {
    const challenge = await this.prismaService.challenge.findFirst({
      where: {
        id: challengeId,
      },
      select: {
        points: true,
      },
    });
    if (!challenge) throw new NotFoundException('Challenge not found');
    if (challenge.points < score)
      throw new BadRequestException('Score is greater than challenge points');
  }

  async systemCreate(createChallengeDto: CreateChallengeDto) {
    await this.refreshCache();

    return await this.prismaService.challenge.create({
      data: createChallengeDto,
    });
  }

  async systemGetAll() {
    return await this.prismaService.challenge.findMany({
      include: {
        domaine: true,
      },
    });
  }

  async systemGetOne(id: number) {
    await this.refreshCache();

    return await this.prismaService.challenge.findUnique({
      where: {
        id,
      },
      include: {
        domaine: true,
      },
    });
  }

  async systemUpdate(updateChallengeDto: SystemUpdateChallengeDto) {
    await this.refreshCache();

    const { id, ...updates } = updateChallengeDto;
    return await this.prismaService.challenge.update({
      where: {
        id,
      },
      data: updates,
    });
  }

  async systemRemove(id: number) {
    await this.refreshCache();
    return await this.prismaService.challenge.delete({
      where: {
        id,
      },
    });
  }

  async getCreateForm() {
    // tech is a prisma enum
    const techs = $Enums.Tech;

    const domains = await this.prismaService.domaine.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return {
      techs,
      domains,
    };
  }

  async refreshCache() {
    await this.cacheManager.reset();
  }
}
