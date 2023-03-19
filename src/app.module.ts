import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoController } from './demo/demo.controller';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { CustomModule } from './custom/custom.module';
import { ConfigModule } from './config/config.module';
import { PModule } from './p/p.module';

@Module({
  imports: [
    DemoModule,
    UserModule,
    ListModule,
    CustomModule,
    ConfigModule.forRoot('/cxx'),
    PModule,
  ],
  controllers: [AppController, DemoController],
  providers: [AppService],
})
export class AppModule {}
