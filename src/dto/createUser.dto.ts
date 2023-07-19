import { IsEmail } from "class-validator";

export class CreateUser {

    @IsEmail()
    email: string;

    password: string;

    refreshToken: string;

    firstName?: string;

    lastName?: string;

    number?: string;

    address?: string;

    description?: string;
}
