import { DynamicModule, Global, Module} from '@nestjs/common';

@Global()
  @Module({})
export class ConfigModule {
  static forRoot(options): DynamicModule { 
    return {
      module: ConfigModule,
      providers: [{
        provide: 'Config',
        useValue: {baseUrl: 'api/' + options},
      }],
      exports: [{
        provide: 'Config',
        useValue: {baseUrl: 'api/'}
      }]
    }
  }
}