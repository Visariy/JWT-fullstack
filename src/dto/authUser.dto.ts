import { IsEmail } from "class-validator";


export class AuthUser {

    @IsEmail()
    email: string;

    password: string;
}
