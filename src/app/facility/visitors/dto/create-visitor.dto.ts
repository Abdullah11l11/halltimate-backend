import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateVisitorDto {
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  nationalId: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  relationshipToPrisoner: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
