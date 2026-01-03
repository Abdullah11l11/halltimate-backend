import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateDocumentDto {
  @IsInt()
  @IsNotEmpty()
  prisonerId: number;

  @IsOptional()
  @IsInt()
  caseId?: number;

  @IsInt()
  @IsNotEmpty()
  uploadedBy: number;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  documentType: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  filePath: string;

  @IsDateString()
  uploadedAt: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
