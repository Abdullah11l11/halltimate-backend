import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePrisonerDto {
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  nationalId: string;

  @IsString()
  @IsIn(['Male', 'Female'])
  gender: string;

  @IsDateString()
  dateOfBirth: string;

  @IsDateString()
  admissionDate: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  status: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  riskLevel: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsInt()
  currentCellId?: number;
}
