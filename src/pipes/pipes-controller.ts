import { Body, Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import type { Response } from "express";
import { CustomValidationPipe } from "./pipes-provider";
import { CreatePipeDTO } from "./create-pipe-dto";
import { UserByIdPipe } from "./user-by-id-pipe";

@Controller('pipes')
export class PipesController {
    @Get(':id')
    // findOne(@Param('id', ParseIntPipe) pipeId: number) {
    //     return pipeId;
    // }
    findOne(@Query('private', new DefaultValuePipe(false), ParseBoolPipe) isPrivate: boolean, @Param('id', UserByIdPipe) user: any) {
        console.log(isPrivate);
        return user;
    }

    @UsePipes(new ValidationPipe())
    @Post()
    createPipe(@Body() createPipeDTO: CreatePipeDTO) { // validation Pipe
        return 'pipe created'
    }
}