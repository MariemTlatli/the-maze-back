import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChallengesService } from './challenges.service';
import CreateChallengeDto from './dto/create-challenge.dto';
import { SubmitChallengeDto } from './dto/submit-challenge.dto';
import SystemUpdateChallengeDto from './dto/system-update-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { GetChallengesFormResponse } from './response/get-challenges-form.response';
import { getChallengesByTeamResponse } from './response/get-challenges-team.response';
import { GetCreateChallengeFormResponse } from './response/get-create-form.response';
import { GetChallengeResponse } from './response/get-challenge.response';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ToggleFreezeDto } from './dto/toggle-freeze.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('Challenges')
@UseInterceptors(CacheInterceptor)
@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get('/admin-leaderboard')
  @ApiOkResponse({
    description: 'Get admin leaderboard',
    type: [getChallengesByTeamResponse],
  })
  getAdminLeaderboard() {
    return this.challengesService.getAdminLeaderboard();
  }

  @Get('/get-form')
  @ApiOkResponse({
    description: 'Get list of teams and challenges form',
    type: [GetChallengesFormResponse],
  })
  getForm() {
    return this.challengesService.getForm();
  }

  @Patch('toggle-freeze')
  @ApiOperation({ summary: 'Activer/Désactiver le système' })
  systemToggleFreeze(@Body() toggleFreezeDto: ToggleFreezeDto) {
    return this.challengesService.systemToggleFreeze(toggleFreezeDto);
  }

  @Get('leaderboard-state')
  @ApiOkResponse({
    description: 'Get leaderboard state',
    type: Boolean,
  })
  getLeaderboardState() {
    return this.challengesService.getLeaderboardState();
  }

  @Post()
  create(@Body() submitChallengeDto: SubmitChallengeDto) {
    return this.challengesService.create(submitChallengeDto);
  }

  @Patch()
  update(@Body() updateChallengeDto: UpdateChallengeDto) {
    return this.challengesService.update(updateChallengeDto);
  }

  @Delete(':challengeId/team/:teamId')
  remove(
    @Param('challengeId') challengeId: number,
    @Param('teamId') teamId: string,
  ) {
    return this.challengesService.remove(challengeId, teamId);
  }

  @Get('/get-create-form')
  @ApiOkResponse({
    description: 'Get create challenge form',
    type: [GetCreateChallengeFormResponse],
  })
  getCreateForm() {
    return this.challengesService.getCreateForm();
  }

  @Post('new')
  systemCreate(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengesService.systemCreate(createChallengeDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all challenges',
    type: [GetChallengeResponse],
  })
  systemGetAll() {
    return this.challengesService.systemGetAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get one challenge',
    type: GetChallengeResponse,
  })
  systemGetOne(@Param('id') id: number) {
    return this.challengesService.systemGetOne(id);
  }

  @Patch(':id')
  systemUpdate(@Body() updateChallengeDto: SystemUpdateChallengeDto) {
    return this.challengesService.systemUpdate(updateChallengeDto);
  }

  @Delete(':id')
  systemRemove(@Param('id') id: number) {
    return this.challengesService.systemRemove(id);
  }
}
