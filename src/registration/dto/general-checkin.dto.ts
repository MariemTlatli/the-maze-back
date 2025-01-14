import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GeneralCheckinDto {
  @IsNotEmpty()
  @ApiProperty()
  ticketNo: string;
}
