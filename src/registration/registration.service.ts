import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Specialization } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import * as qr from 'qr-image';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as fs from 'fs';
import { PrismaService } from 'src/common/prisma.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { DinnerCheckin } from './dto/dinner-checkin.dto';
import { GeneralCheckinDto } from './dto/general-checkin.dto';
import { GetRegistrationsDto } from './dto/get-registration.dto';
import { WorkshopCheckinDto } from './dto/WorkshopsCheckin.dto';
import { RegistrationFormResponse } from './responses/registrationForm.response';
import UpdateTeamDto from './dto/update-team.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

@Injectable()
export class RegistrationService {
  constructor(
    private prismaService: PrismaService,
    private mailerService: MailerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async confirmDinner(dinnerCheckin: DinnerCheckin) {
    const { ticketNo } = dinnerCheckin;
    console.log(dinnerCheckin);
    const ticket = await this.prismaService.ticket.findFirst({
      where: {
        ticketNo,
      },
    });
    if (!ticket) throw new NotFoundException('Ticket not found');

    const updatedTicket = await this.prismaService.ticket.update({
      where: {
        ticketNo,
      },
      data: {
        hadMeal: !ticket.hadMeal,
      },
    });
    await this.refreshCache();

    return updatedTicket;
  }

  async confirmWorkshopCheckin(workshopCheckinDto: WorkshopCheckinDto) {
    const { ticketNo, workshopId } = workshopCheckinDto;
    const workshop = await this.prismaService.workshopsByTicket.findUnique({
      where: {
        ticketId_workshopId: {
          ticketId: ticketNo,
          workshopId,
        },
      },
    });

    if (!workshop) throw new BadRequestException('Workshop not found');

    const updatedWorkshop = await this.prismaService.workshopsByTicket.update({
      where: {
        ticketId_workshopId: {
          ticketId: ticketNo,
          workshopId,
        },
      },
      data: {
        hasAttended: !workshop.hasAttended,
      },
    });

    await this.refreshCache();

    return updatedWorkshop;
  }
  async confirmGeneralCheckin(generalCheckinDto: GeneralCheckinDto) {
    const { ticketNo } = generalCheckinDto;
    try {
      const ticket = await this.prismaService.ticket.findFirst({
        where: {
          ticketNo,
        },
      });
      if (!ticket) throw new BadRequestException('Ticket not found');

      const updatedTicket = await this.prismaService.ticket.update({
        where: {
          ticketNo,
          // done: false, // Ensure ticket is not already marked as done
        },
        data: {
          done: !ticket.done,
        },
      });
      await this.refreshCache();

      return updatedTicket;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        // Handle the case where the ticket is already confirmed
        throw new ConflictException('Ticket has already been confirmed !');
      } else {
        // Handle other errors
        throw error;
      }
    }
  }

  async verifyQRCode(qrCode: string) {
    try {
      const { email, ticketNo } = jwt.verify(
        qrCode,
        process.env.JWT_SECRET_KEY,
      ) as { email: string; ticketNo: string };

      if (!email || !ticketNo) throw new BadRequestException('Invalid QR code');
      //check email exist
      const attendee = await this.prismaService.attendee.findFirst({
        where: {
          email: email,
        },
      });
      if (!attendee)
        throw new BadRequestException(
          `Invalid QR Code:  No such Email ${email}`,
        );
      return this.verifyTicketCode(ticketNo);
    } catch (error) {
      throw new BadRequestException(error.message || 'Invalid QR code');
    }
  }
  async verifyTicketCode(ticketNo: string) {
    try {
      return await this.prismaService.ticket.findFirstOrThrow({
        where: {
          ticketNo,
        },
        select: {
          ticketNo: true,
          done: true,
          attendee: {
            select: {
              id: true,
              name: true,
              email: true,
              team: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          workshops: {
            select: {
              hasAttended: true,
              workshop: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new Error('Invalid Ticket code');
    }
  }

  async registerAttendee(createRegistrationDto: CreateRegistrationDto) {
    //save data
    await this.CreateRegistration(createRegistrationDto);
    //create qrcode
    const { email, ticketNo, name } = createRegistrationDto;
    const QRimg = await this.generateQRImg(email, ticketNo);

    //send email
    await this.sendEmail(email, QRimg, name);
    await this.refreshCache();

    return `<img src="${QRimg}" alt="QR Code" />`;
  }
  async generateQRImg(email: string, ticketNo: string) {
    const token = jwt.sign({ email, ticketNo }, process.env.JWT_SECRET_KEY);
    const qrCode = qr.image(token, { type: 'png' });

    return await new Promise<string>((resolve, reject) => {
      const chunks: any[] = [];
      qrCode.on('data', (chunk) => chunks.push(chunk));
      qrCode.on('end', () => {
        const qrCodeData = Buffer.concat(chunks).toString('base64');
        resolve(`data:image/png;base64,${qrCodeData}`);
      });
      qrCode.on('error', (error) => reject(error));
    });
  }
  async getRegistrationForm(): Promise<RegistrationFormResponse> {
    const workshops = await this.prismaService.workshop.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    const teams = await this.prismaService.team.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const facs = await this.prismaService.fac.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return { workshops, teams, facs };
  }

  async findAll(getRegistrationsDto: GetRegistrationsDto) {
    const { currentPage = 0, sizePerPage = 10, search } = getRegistrationsDto;

    const isPagination = currentPage !== undefined && sizePerPage !== undefined;
    const take = isPagination ? sizePerPage : undefined;
    const skip = isPagination ? (currentPage || 0) * sizePerPage : undefined;

    const where: Prisma.AttendeeWhereInput = search
      ? {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              email: {
                contains: search,
              },
            },
          ],
        }
      : {};

    const [registrations, totalItems] = await this.prismaService.$transaction(
      async (tx) => {
        const registrations = await tx.attendee.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            studyLevel: true,
            specialization: true,
            fac: {
              select: {
                id: true,
                name: true,
              },
            },
            team: {
              select: {
                id: true,
                name: true,
              },
            },
            ticket: {
              select: {
                ticketNo: true,
                done: true,
                hadMeal: true,
                workshops: {
                  select: {
                    hasAttended: true,
                    workshop: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
          where,
          take,
          skip,
        });
        let count;
        if (isPagination)
          count = await tx.attendee.aggregate({
            _count: {
              _all: true,
            },
            where,
          });
        return [registrations, count];
      },
    );

    return { data: registrations, totalItems: totalItems?._count?._all };
  }

  async CreateRegistration(createRegistrationDto: CreateRegistrationDto) {
    const {
      teamId,
      teamName,
      workshopIds,
      name,
      email,
      phone,
      ticketNo,
      studyLevel,
      facName,
      specialization,
      facId,
    } = createRegistrationDto;

    const isTicketUsed = await this.prismaService.ticket.findFirst({
      where: {
        ticketNo,
      },
    });
    if (isTicketUsed) throw new ConflictException('Ticket already used');

    const isStudent = specialization !== Specialization.OTHER;

    await this.prismaService.$transaction(async (tx) => {
      const { ticketNo: ticketId } = await tx.ticket.create({
        data: {
          ticketNo: ticketNo,
          workshops: {
            create: [
              ...workshopIds.map((id) => ({
                workshop: {
                  connect: {
                    id,
                  },
                },
              })),
            ],
          },
        },
        select: {
          ticketNo: true,
        },
      });
      let team;
      if (!teamId)
        team = await tx.team.create({
          data: {
            name: teamName,
          },
        });

      let fac;
      if (isStudent && !facId)
        fac = await tx.fac.create({
          data: {
            name: facName,
          },
          select: {
            id: true,
          },
        });

      await tx.attendee.create({
        data: {
          name,
          email,
          phone,
          studyLevel,
          ticket: {
            connect: {
              ticketNo: ticketId,
            },
          },
          team: teamId
            ? { connect: { id: teamId } }
            : { connect: { id: team.id } },
          fac: isStudent ? { connect: { id: facId || fac?.id } } : undefined,
          specialization,
        },
      });
    });
  }

  async sendEmail(to: string, qr: string, name: string) {
    //TODO ask team mic to give you template for email
    const template = fs.readFileSync('public/template.html', 'utf8');

    let content = template.replace('{{QR_CODE}}', qr);
    content = content.replace('{{NAME}}', name);

    try {
      await this.mailerService.sendMail({
        to: to,
        from: 'themazeevent@outlook.com',
        subject: 'Ticket for the maze event ✔',
        text: 'welcome participant',
        attachDataUrls: true, //to accept base64 content in messsage
        html: content,
      });
    } catch (error) {
      console.log({ error });
    }
  }

  async findOneById(id: string) {
    console.log('getting attendee', id);
    return await this.prismaService.attendee.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        studyLevel: true,
        specialization: true,
        fac: {
          select: {
            id: true,
            name: true,
          },
        },
        team: {
          select: {
            id: true,
            name: true,
          },
        },
        ticket: {
          select: {
            ticketNo: true,
            done: true,
            hadMeal: true,
            workshops: {
              select: {
                hasAttended: true,
                workshop: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async resendEmail(ticketNo: string) {
    const ticket = await this.prismaService.ticket.findFirst({
      where: {
        ticketNo,
      },
      select: {
        attendee: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    if (!ticket) throw new BadRequestException('Invalid ticket number');

    const QRimg = await this.generateQRImg(ticket.attendee.email, ticketNo);

    await this.sendEmail(ticket.attendee.email, QRimg, ticket.attendee.name);
    return `<img src="${QRimg}" alt="QR Code" />`;
  }

  async findAllTeams(search?: string) {
    const where: Prisma.TeamWhereInput = search
      ? {
          name: {
            contains: search,
          },
        }
      : {};

    return await this.prismaService.team.findMany({
      where,
      select: {
        id: true,
        name: true,
        members: {
          select: {
            id: true,
            name: true,
            ticket: {
              select: {
                ticketNo: true,
                done: true,
              },
            },
          },
        },
      },
    });
  }
  async refreshCache() {
    await this.cacheManager.reset();
  }

  async updateTeam(updateTeamDto: UpdateTeamDto) {
    const { id, name } = updateTeamDto;

    const team = await this.prismaService.team.findUnique({
      where: {
        id,
      },
    });

    if (!team) throw new NotFoundException('Team not found');

    await this.prismaService.team.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    this.refreshCache();
  }

  async deleteTeam(id: string) {
    // checking if the team has members
    const team = await this.prismaService.team.findUnique({
      where: {
        id,
      },
      include: {
        members: true,
      },
    });
    if (!team) throw new NotFoundException('Team not found');
    if (team.members.length > 0) {
      throw new BadRequestException('This Team Has Memebers');
    }

    await this.prismaService.team.delete({
      where: {
        id,
      },
    });

    this.refreshCache();
    return;
  }

  async updateRegistration(updateRegistrationDto: UpdateRegistrationDto) {
    // checking attendee registration
    const attendee = await this.prismaService.attendee.findUnique({
      where: {
        id: updateRegistrationDto.id,
      },
      include: {
        ticket: true,
      },
    });

    if (!attendee) throw new NotFoundException('Attendee not found');

    // updating attendee registration
    const teamId = updateRegistrationDto.teamId
      ? updateRegistrationDto.teamId
      : (
          await this.prismaService.team.create({
            data: {
              name: updateRegistrationDto.teamName,
            },
          })
        ).id;

    await this.prismaService.attendee.update({
      where: {
        id: updateRegistrationDto.id,
      },
      data: {
        name: updateRegistrationDto.name,
        email: updateRegistrationDto.email,
        phone: updateRegistrationDto.phone,
        teamId: teamId,
      },
    });

    // updating workshops
    const t = await this.prismaService.$transaction(async (tx) => {
      await tx.workshopsByTicket.deleteMany({
        where: {
          ticketId: attendee.ticketId,
        },
      });

      await tx.workshopsByTicket.createMany({
        data: updateRegistrationDto.workshopIds.map((workshopId) => ({
          ticketId: attendee.ticketId,
          workshopId,
        })),
      });
    });

    if (attendee.email !== updateRegistrationDto.email) {
      this.resendEmail(attendee.ticket.ticketNo);
    }

    this.refreshCache();
  }
}
