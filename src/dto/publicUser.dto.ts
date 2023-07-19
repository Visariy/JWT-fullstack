import { IsEmail, IsMobilePhone, MaxLength } from "class-validator";

export class publicUserInfo {

  @IsEmail()
  email?: string;


  firstName?: string;


  lastName?: string;

  @IsMobilePhone()
  number?: string;

  address?: string;

  @MaxLength(100)
  description?: string;
}
