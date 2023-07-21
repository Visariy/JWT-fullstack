import { IsNotEmpty, MaxLength } from "class-validator";

export class UpdateUser {
    refreshToken?: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    number: string;

    @IsNotEmpty()
    address?: string;

    description?: string;
}
