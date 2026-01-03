import { IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCaseDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  caseNumber: string;

  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  courtName: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  caseType: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  status: string;

  @IsDateString()
  openDate: string;

  @IsOptional()
  @IsDateString()
  closeDate?: string;
}
