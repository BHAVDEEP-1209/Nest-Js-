import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats-service";
import { ConfigOptionsModule } from "src/config-options/config-options.module";

@Module({
    // imports: [ConfigOptionsModule],
    controllers: [CatsController],
    providers: [{
        provide: 'meriCatsToken',
        useClass: CatsService
    }] // registering CatsService results in different instance in different modules
    // to reuse same instance export from one module and import in other modules
})
export class CatsModule { }