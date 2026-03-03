import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class ProtectedRouteGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isProtected = this.reflector.get<boolean>('isProtected', context.getHandler());

        if (isProtected) {
            console.log('route is protected!');
            const req = context.switchToHttp().getRequest();
            const token = this.extractTokenFromHeader(req);
            console.log('token', token);
            if (!token) {
                throw new UnauthorizedException();
            }

            try {
                const payload = await this.jwtService.verifyAsync(token);
                console.log('payload', payload);
                req['user'] = payload;
            } catch (error) {
                throw new UnauthorizedException();
            }
        }
        return true;
    }

    private extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}