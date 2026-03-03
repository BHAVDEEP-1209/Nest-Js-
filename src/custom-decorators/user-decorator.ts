import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// decorator - composition
export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
})