import { Column, PrimaryGeneratedColumn } from "typeorm";
import { IsMobilePhone, IsNotEmpty, MaxLength } from "class-validator";

export class UpdateUser {
    refreshToken?: string;

    firstName?: string;

    lastName?: string;

    number?: string;

    address?: string;

    description?: string;
}
