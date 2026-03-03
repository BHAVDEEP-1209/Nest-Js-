import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles-decorator";
import { RoleGuard } from "./role-guard";

export function Auth() {
    return applyDecorators(
        Roles('admin'),
        UseGuards(RoleGuard)
    )
}