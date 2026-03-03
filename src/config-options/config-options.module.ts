import { Global, Module } from "@nestjs/common";
import { MyOptionsProvider } from "./my-options";

const configServiceProviderRegistration = {
    provide: 'ConfigOptions',
    useFactory: (optionsProvider: MyOptionsProvider) => {
        // console.log('optionsProvider', optionsProvider)
        return optionsProvider.get();
    },
    inject: [MyOptionsProvider]
}

@Global() // register once use everywhere
@Module({
    providers: [MyOptionsProvider, configServiceProviderRegistration],
    // exports: ['ConfigOptions'],
    exports: [configServiceProviderRegistration],
})
export class ConfigOptionsModule { }