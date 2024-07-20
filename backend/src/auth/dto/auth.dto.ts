import { IsEmail, IsString, MinLength } from "class-validator"

export class AuthDto {

    @IsEmail()
    email: string

    @IsString()
    @MinLength(6,{
        message: 'Passwod cannot be less then 6 characters'
    })
    password: string
}