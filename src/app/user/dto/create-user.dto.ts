import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { UserType } from 'src/shared/utils/enum';

export class Register {
  @IsString()
  @IsEmail()
  @Length(3, 250)
  @IsNotEmpty()
  email: string;
  @IsString()
  @Length(3, 250)
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @Length(3, 250)
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
  @IsOptional()
  @IsEnum(UserType, {
    message:
      'role must be one of: admin, warden, guard, medical, case_manager, visitor_officer, clerk',
  })
  role?: UserType;
}

export class Login {
  @IsString()
  @IsEmail()
  @Length(3, 250)
  @IsNotEmpty()
  @IsOptional()
  email?: string;
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
