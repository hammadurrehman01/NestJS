import { IsEmail, IsEnum, IsNotEmpty, IsString, isString } from "class-validator"
import { USERROLE } from "../enums/user.enums";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(USERROLE, {
        message: "Valid role required"
    })
    role: USERROLE
}