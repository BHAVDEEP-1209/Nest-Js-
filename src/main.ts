import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddlewareFunction } from './middleware/logger-middleware';
import { HttpExceptionFilter } from './exception-filter/http-exception-filter';
import { ValidationPipe } from '@nestjs/common';
import { CustomInterceptor } from './interceptors/interceptors';
import cookieParser from 'cookie-parser';
// import { LoggerMiddleware } from './middleware/logger-middleware';

// Everything is shared in nest : the database connection pool, singleton services with global state
// It is safe as Node js is single threaded avoiding race conditions like in multi threading env

async function bootstrap() {
  // app implements INestApplication interface
  const app = await NestFactory.create(AppModule); // factory create an app instance
  // app.use(loggerMiddlewareFunction);
  // app.useGlobalInterceptors(new CustomInterceptor());
  app.use(cookieParser());
  app.enableCors({  // when cookies are automatically sent from frontend to backend with withCredentials: true backend need to know the origin of the request or gives cors error
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
