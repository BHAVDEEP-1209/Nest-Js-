import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const roles = this.reflector.getAllAndMerge<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('roles', roles);
        return true;
    }
}