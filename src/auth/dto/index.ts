import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    password: string;
}

export class SignInDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    password: string;
}