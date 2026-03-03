import { Body, Controller, Get, Inject, Param, Post, Request, Res } from "@nestjs/common";
import type { Response } from "express";
import { CreateCatDTO } from "./cats-dto";
import { CatsService } from "./cats-service";
import { User } from "src/custom-decorators/user-decorator";
import { ForbiddenHTTPException } from "src/exception-filter/exception-classes";

// decorator
// 1. modify behaviour
// 2. add meta data
// 3. for classes, functions, parameters 

@Controller('cats')
export class CatsController {
    constructor(@Inject('meriCatsToken') private catsService: CatsService) { }

    // route -> optional + specific path
    @Get()
    findAll(@Request() request: any, @Res() response: Response, @User() asd: any) {
        // console.log('request inside controller', asd);
        // return response.status(200).json(this.catsService.findAll());
        throw new ForbiddenHTTPException();
    }

    @Get(':id')
    findSpecificCat(@Param('id') param: string, @Res({ passthrough: true }) response: Response) {
        // return response.status(200).send(`The cats is ${param}`);
        response.status(200);
        return [];
    }

    // classes for dto instead of interface beacuse after transpiling to js, interface is removed
    // pipes require variable metadata at run time provided by classes
    @Post()
    createCat(@Body() createCatDto: CreateCatDTO, @Res({ passthrough: true }) res: Response) {
        // console.log(createCatDto);
        this.catsService.create(createCatDto);
        res.status(200);
        return 'cat added'
    }
}
