import { IsNumber, IsString } from "class-validator";

export class CreatePipeDTO {
    @IsString()
    name: string;

    @IsNumber()
    age: number;
}