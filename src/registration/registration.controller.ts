import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import {
  QRCodeValidationPipe,
  TicketNoValidationPipe,
} from 'src/common/custom-validation';
import { WorkshopCheckinDto } from './dto/WorkshopsCheckin.dto';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { DinnerCheckin } from './dto/dinner-checkin.dto';
import { GeneralCheckinDto } from './dto/general-checkin.dto';
import { GetRegistrationsDto } from './dto/get-registration.dto';
import { resendEmailDto } from './dto/resend-email.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import UpdateTeamDto from './dto/update-team.dto';
import { RegistrationService } from './registration.service';
import { GetRegistrationResponse } from './responses/get-registration.response';
import {
  GetRegistrationsResponse,
  GetTeamsResponse,
} from './responses/get-registrations.response';
import { RegistrationFormResponse } from './responses/registrationForm.response';

@UseGuards(JwtAuthGuard)
@ApiTags('Registration')
@UseInterceptors(CacheInterceptor)
@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Get('/get-form')
  @ApiOkResponse({
    description: 'Get registration form',
    type: RegistrationFormResponse,
  })
  getRegistrationForm() {
    return this.registrationService.getRegistrationForm();
  }

  @Get('/')
  @ApiOkResponse({
    description: 'Get all registrations',
    type: GetRegistrationsResponse,
  })
  getRegistrations(@Query() getRegistrationsDto: GetRegistrationsDto) {
    return this.registrationService.findAll(getRegistrationsDto);
  }

  @Get('/teams')
  @ApiOkResponse({
    description: 'Get all teams with their members',
    type: GetTeamsResponse,
  })
  getTeams(@Query('search') search: string) {
    return this.registrationService.findAllTeams(search);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Get a single registration',
    type: GetRegistrationResponse,
  })
  getSingleRegistration(@Param('id') id: string) {
    return this.registrationService.findOneById(id);
  }

  @Get('/verify-qrcode/:qrcode')
  verifyQRCode(@Param('qrcode', new QRCodeValidationPipe()) qrCode: string) {
    return this.registrationService.verifyQRCode(qrCode);
  }

  @Get('/verify-ticketId/:ticketId')
  verifyCode(
    @Param('ticketId', new TicketNoValidationPipe()) ticketId: string,
  ) {
    return this.registrationService.verifyTicketCode(ticketId);
  }

  @Patch('/confirm-general-checkin')
  confirmGeneralCheckin(@Body() generalCheckinDto: GeneralCheckinDto) {
    return this.registrationService.confirmGeneralCheckin(generalCheckinDto);
  }

  @Patch('/confirm-workshop-checkin')
  confirmWorkshopCheckin(@Body() workshopCheckinDto: WorkshopCheckinDto) {
    return this.registrationService.confirmWorkshopCheckin(workshopCheckinDto);
  }
  @Patch('/confirm-dinner')
  confirmDinner(@Body() dinnerCheckin: DinnerCheckin) {
    return this.registrationService.confirmDinner(dinnerCheckin);
  }

  @Post('/resend-email')
  sendEmail(@Body() resendEmailDto: resendEmailDto) {
    return this.registrationService.resendEmail(resendEmailDto.ticketNo);
  }
  @Post()
  registerAttendee(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationService.registerAttendee(createRegistrationDto);
  }

  @Patch('teams')
  updateTeam(@Body() updateTeamDto: UpdateTeamDto) {
    return this.registrationService.updateTeam(updateTeamDto);
  }

  @Delete('teams/:id')
  deleteTeam(@Param('id') id: string) {
    return this.registrationService.deleteTeam(id);
  }

  @Patch()
  updateRegistration(@Body() updateRegistration: UpdateRegistrationDto) {
    return this.registrationService.updateRegistration(updateRegistration);
  }
}
