import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CustomService } from './custom.service';
import { CustomController } from './custom.controller';
import { Logger } from 'src/middleware';

@Module({
  controllers: [CustomController],
  providers: [CustomService],
  exports: [CustomService],
})
export class CustomModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes({path: 'custom', method: RequestMethod.GET});
  }
}
