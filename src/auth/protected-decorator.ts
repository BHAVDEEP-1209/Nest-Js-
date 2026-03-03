import { SetMetadata } from "@nestjs/common";

export function Protected() {
    return SetMetadata('isProtected', true);
}