import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  BadRequestException,
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
import * as zlib from 'zlib';
import * as util from 'util';

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

  @Get('/statistics/general')
  @ApiOkResponse({
    description: 'Get all statistics',
    type: GetRegistrationsResponse,
  })
  async getAllStats() {
    const [
      general,
      workshops,
      fac,
      studyLevels,
      specializations,
      teamChallenges,
    ] = await Promise.all([
      this.registrationService.getGeneralStats(),
      this.registrationService.getWorkshopStats(),
      this.registrationService.getFacStats(),
      this.registrationService.getStudyLevelStats(),
      this.registrationService.getSpecializationStats(),
      this.registrationService.getTeamChallengeStats(),
    ]);

    return {
      general,
      workshops,
      fac,
      studyLevels,
      specializations,
      teamChallenges,
    };
  }

  @Post('/test/w')
  async createWorkshop(@Body('name') name: string) {
    return this.registrationService.createWorkshop(name);
  }
  @Post('/test/e')
  async sendCertificatesToEmails(
    @Body('emails') emails: string[], // Liste des emails (remplacez "name" par "emails")
    @Body('workshopId') workshopId: string, // ID de l'atelier
    @Body('pdfBuffers') pdfBuffers: string[], // Tableau de buffers PDF encodés en base64
  ) {
    // Validation des entrées
    if (!Array.isArray(emails) || emails.length === 0) {
      throw new BadRequestException(
        'The "emails" field must be a non-empty array.',
      );
    }

    if (!workshopId) {
      throw new BadRequestException('The "workshopId" field is required.');
    }

    if (!Array.isArray(pdfBuffers) || pdfBuffers.length !== emails.length) {
      throw new BadRequestException(
        'The "pdfBuffers" field must be an array of the same length as "emails".',
      );
    }
    // Décompresser les PDF
    const decompressedPdfs = await Promise.all(
      pdfBuffers.map(async (base64CompressedPdf) => {
        const compressedBuffer = Buffer.from(base64CompressedPdf, 'base64');
        const decompressAsync = util.promisify(zlib.gunzip);
        return decompressAsync(compressedBuffer); // Retourne un Buffer décompressé
      }),
    );

    // Appel du service pour envoyer les certificats
    return this.registrationService.sendCertificatesToEmails(
      emails,
      workshopId,
      decompressedPdfs.map((buffer) => buffer.toString('base64')),
    );
  }

  @Get(':id/attendees-present')
  async getAttendeesPresent(@Param('id') workshopId: string) {
    const attendees =
      await this.registrationService.getAttendeesPresentAtWorkshop(workshopId);
    return { attendees };
  }
}
