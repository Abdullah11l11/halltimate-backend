import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class StaffLoginDto {
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
