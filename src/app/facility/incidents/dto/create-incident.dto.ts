import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateIncidentDto {
  @IsOptional()
  @IsInt()
  prisonerId?: number;

  @IsOptional()
  @IsInt()
  reportedByStaffId?: number;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  incidentType: string;

  @IsDateString()
  incidentDate: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  severity: string;

  @IsOptional()
  @IsString()
  actionTaken?: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  status: string;
}
