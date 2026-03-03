import { Injectable, NestMiddleware } from "@nestjs/common";

// supports dependency injection through constructor
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        console.log('Request logging... logger 1');
        next();
    }
}

@Injectable()
export class LoggerMiddleware2 implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        console.log('Request logging... logger 2');
        next();
    }
}

// functional
export function loggerMiddlewareFunction(req: any, res: any, next: (error?: any) => void) {
    console.log('logging functional middleware!');
    next();
}

