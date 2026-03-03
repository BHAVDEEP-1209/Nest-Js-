import { Controller, Get, HttpException, HttpStatus, UseFilters } from "@nestjs/common";
import { ForbiddenHTTPException } from "./exception-classes";
import { HttpExceptionFilter } from "./http-exception-filter";

// @UseFilters(HttpExceptionFilter)
@Controller('exception')
export class ExceptionController {
    @Get()
    findAll() {
        // throw new HttpException({ errorStatusCode: HttpStatus.OK, errorMessage: 'error hai' }, HttpStatus.FORBIDDEN, { cause: 'asdasdasdas', description: 'error describing!' });
        throw new ForbiddenHTTPException();
    }
}