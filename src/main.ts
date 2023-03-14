import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { Request, Response, NextFunction } from 'express';
import * as cors from 'cors';

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
  app.use(MiddlewareAll);
  app.use(session({ secret: 'cx', name: 'cx.session', rolling: true, cookie: { maxAge: null } }));
  await app.listen(3000);
}
bootstrap();
