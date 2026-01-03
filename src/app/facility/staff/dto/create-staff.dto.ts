import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  nationalId: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  position: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
