import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { catchError, map, Observable, of, tap, throwError, timeout, TimeoutError } from "rxjs";
import { CacheOptions } from "./cache-decorator";

@Injectable()
export class CustomInterceptor implements NestInterceptor {
    private cachedResponse = new Map();

    constructor(private readonly reflector: Reflector) { } // contructor dependency injection

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        // cached interceptor
        const handleInformation = this.reflector.get<CacheOptions>('cache', context.getHandler());

        if (handleInformation?.key) {
            const cachedValue = this.cachedResponse.get(handleInformation.key)
            if (cachedValue) {
                console.log('sending cached value for', handleInformation.key);
                return of(cachedValue);
            }
            return next.handle().pipe(tap((data) => {
                this.cachedResponse.set(handleInformation.key, data);
            }))
        }
        return next.handle();

        // calculating time for handler
        // const now = Date.now();
        // return next.handle().pipe(tap(() => {
        //     console.log(`after request handling! ${Date.now() - now}`);
        // }));

        // response mapping
        // return next.handle().pipe(map((data) => ({ data, timestamp: new Date().toISOString() })))

        // timeout interceptor
        // return next.handle().pipe(timeout(1000), catchError((err) => {
        //     if (err instanceof TimeoutError) {
        //         return throwError(() => new RequestTimeoutException());
        //     }
        //     return throwError(() => err);
        // }))
    }
}