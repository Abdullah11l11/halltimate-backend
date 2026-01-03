import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateHealthRecordDto {
  @IsInt()
  @IsNotEmpty()
  prisonerId: number;

  @IsOptional()
  @IsInt()
  doctorId?: number;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  recordType: string;

  @IsDateString()
  recordDate: string;

  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  diagnosis: string;

  @IsOptional()
  @IsString()
  treatment?: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
