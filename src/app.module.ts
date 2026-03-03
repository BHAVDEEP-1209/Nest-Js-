import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats-service';
import { MyOptionsProvider } from './config-options/my-options';
import { CatsModule } from './cats/cats-module';
import { ConfigOptionsModule } from './config-options/config-options.module';
import { DynamicModule } from './dynamic-module/dynamic-module';
import { LoggerMiddleware, LoggerMiddleware2 } from './middleware/logger-middleware';
import { ExceptionModule } from './exception-filter/exception-module';
import { APP_FILTER, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { HttpExceptionFilter } from './exception-filter/http-exception-filter';
import { PipesModule } from './pipes/pipes-module';
import { GuardsModule } from './guards/guards-module';
import { CustomInterceptor } from './interceptors/interceptors';
import { AuthModule } from './auth/auth.module';

// dependency injection
// 1. constructor
// 2. property

// const configServiceProviderRegistration = {
//   provide: 'configOptions',
//   useFactory: (optionsProvider: MyOptionsProvider) => {
//     console.log('optionsProvider', optionsProvider)
//     return optionsProvider.get();
//   },
//   inject: [MyOptionsProvider]
// }

@Module({
  imports: [CatsModule, ConfigOptionsModule, DynamicModule.forRoot(), ExceptionModule, PipesModule, GuardsModule, AuthModule],
  controllers: [AppController,
    // CatsController
  ],
  providers: [
    AppService,
    // MyOptionsProvider,
    // configServiceProviderRegistration,
    // {
    //   provide: "meriCatsToken",
    //   useClass: CatsService,
    //   // useValue: new CatsService() // value -> on manual intialization nest DI does not inject dependencies in CatsService
    //   // useClass : require class and self intialization , dynamic classes
    //   // useFactory: dynamic provider
    // },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomInterceptor
    }
  ],
})
export class AppModule { }
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware, LoggerMiddleware2)
//       // .exclude({ method: RequestMethod.GET, path: 'cats' }, 'cats/{*id}')
//       .forRoutes(CatsController);
//   }
// }
