import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUser {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(4)
    password: string;

    refreshToken: string;

    firstName?: string;

    lastName?: string;

    number?: string;

    address?: string;

    description?: string;
}
