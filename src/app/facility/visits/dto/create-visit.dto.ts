import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateVisitDto {
  @IsInt()
  @IsNotEmpty()
  prisonerId: number;

  @IsInt()
  @IsNotEmpty()
  visitorId: number;

  @IsDateString()
  visitDate: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  visitType: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
