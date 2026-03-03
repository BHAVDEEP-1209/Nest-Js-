import { Module } from "@nestjs/common";
import { Connection } from "./connections";

@Module({
    providers: [], // static providers
    exports: [] // static exports
})
export class DynamicModule {
    static forRoot(entities = [], options?: []) {
        const providers = [{
            provide: 'database_connection',
            // useClass: Connection 
            useFactory: () => {
                return new Connection().get()
            }
        }]
        return {
            module: DynamicModule,
            providers: providers,
            exports: providers,
            global: true
        }
    }
}

