import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  @IsString()
  password: string;
}
