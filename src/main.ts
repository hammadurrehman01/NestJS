import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionFilter } from './all-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter))

  app.useLogger(app.get(MyLoggerService))
  app.enableCors()
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3001);
};
bootstrap();
