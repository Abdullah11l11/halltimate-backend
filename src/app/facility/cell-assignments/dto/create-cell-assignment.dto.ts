import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCellAssignmentDto {
  @IsInt()
  @IsNotEmpty()
  prisonerId: number;

  @IsInt()
  @IsNotEmpty()
  cellId: number;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
