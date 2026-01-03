import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateCellDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  blockName: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  securityLevel: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  cellNumber: string;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsInt()
  @Min(0)
  currentOccupancy: number;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  cellType: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
