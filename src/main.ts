import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import { ResponseNew } from './common/responseNew';
import { HttpFillter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
// import { RoleGuard } from './guard/role/role.guard';

const whiteList = ['/list'];
function MiddlewareAll(req: Request, res: Response, next: NextFunction) {
  if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    res.send({
      message: '未通过',
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(cors());
  // app.use(MiddlewareAll);
  app.use(
    session({
      secret: 'cx',
      name: 'cx.session',
      rolling: true,
      cookie: { maxAge: null },
    }),
  );
  // 请求拦截器
  app.useGlobalInterceptors(new ResponseNew());
  // 错误拦截器
  app.useGlobalFilters(new HttpFillter());
  // 参数校验
  app.useGlobalPipes(new ValidationPipe());
  // 全局守卫
  // app.useGlobalGuards(new RoleGuard());
  await app.listen(3000);
}
bootstrap();
