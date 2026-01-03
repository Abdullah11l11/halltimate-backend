import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCrimeRecordDto {
  @IsInt()
  @IsNotEmpty()
  prisonerId: number;

  @IsInt()
  @IsNotEmpty()
  caseId: number;

  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  crimeTitle: string;

  @IsString()
  @IsNotEmpty()
  crimeDetails: string;

  @IsDateString()
  crimeDate: string;

  @IsInt()
  @Min(0)
  sentenceYears: number;

  @IsInt()
  @Min(0)
  sentenceMonths: number;

  @IsDateString()
  sentenceStart: string;

  @IsDateString()
  sentenceEnd: string;

  @IsString()
  @MaxLength(20)
  status: string;
}
