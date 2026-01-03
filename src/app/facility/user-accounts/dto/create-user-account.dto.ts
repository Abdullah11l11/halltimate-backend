import { IsBoolean, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UserType } from 'src/shared/utils/enum';

export class CreateUserAccountDto {
  @IsInt()
  @IsNotEmpty()
  staffId: number;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserType)
  role: UserType;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDateString()
  lastLogin?: string;
}
