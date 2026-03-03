import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "./roles-decorator";
import { Auth } from "./auth-decorator";
import { Cachable } from "src/interceptors/cache-decorator";

@Auth()
@Controller('guards')
export class GuardsController {
    @Roles('customer')
    @Cachable({
        key: 'guards',
        ttl: 60
    })
    @Get()
    async findAll() {
        // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        console.log('calling route handler all guards!');
        return 'all guards'
    }
}