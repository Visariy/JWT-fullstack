import { IsMobilePhone, IsNotEmpty, MaxLength } from "class-validator";

export class UpdateUser {
    refreshToken?: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsMobilePhone()
    number: string;

    @IsNotEmpty()
    address?: string;

    @MaxLength(100)
    description?: string;
}
