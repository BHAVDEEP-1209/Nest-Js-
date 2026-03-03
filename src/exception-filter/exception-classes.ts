import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenHTTPException extends HttpException {
    constructor() {
        super('Forbidden', HttpStatus.FORBIDDEN)
    }
}