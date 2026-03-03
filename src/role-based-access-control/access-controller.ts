import { Controller, Get } from "@nestjs/common";
import { Protected } from "src/auth/protected-decorator";
import { SetPermission } from "./perimission-decorator";

@Controller('access-control')
export class AccessController {
    @Get()
    @Protected()
    @SetPermission()
    findAll() {
        return 'role based access control'
    }
}