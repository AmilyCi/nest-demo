import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private Reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('经过了这个守卫');
    const admin = this.Reflector.get<string[]>('role', context.getHandler());
    const request = context.switchToHttp().getRequest<Request>();
    console.log('admin', admin);
    if (admin?.includes(request.query.role as string)) {
      return true;
    } else {
      return false;
    }
  }
}
