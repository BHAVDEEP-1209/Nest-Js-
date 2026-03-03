import { IsNumber, IsString } from "class-validator";

export class UserDto {
    @IsNumber()
    username: number;

    @IsNumber()
    id: number
}