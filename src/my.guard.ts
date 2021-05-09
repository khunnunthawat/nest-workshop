import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const request = context.switchToHttp().getRequest();
    // // เป็นการดักจับถ้ามีีต้องนี้จะสามารถดูข้อมูลได้
    // if (request.query.secret === '1234') {
    //   return true;
    // }
    return true;
  }
}

// Guard ใช้ในการเช็คสิทธิ์ว่าคุณเข้าได้มั้ย
// Guard จะถูกเรียกหลัง middleware แต่ว่าจะถูกเรียกก่อน interceptor
