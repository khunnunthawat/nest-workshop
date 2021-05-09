import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
// import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before...');

    // const now = Date.now(); // ข้อมูลขาเข้าทำการดัก
    // return next
    //   .handle() // ทำการจัดการตัว req ที่ยิงเข้ามา
    //   .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`))); // ข้อมูลขาออกทำการดักโดยใช้ tap
    // pipe สร้างลำดับงานเป็นงานย่อยๆตาม tap ที่เราใส่
    // tap ไว้ทำการดัก
    // console.log('Logger Interceptor xxx');
    // return next.handle();
    // next.handle ก็คือให้มันไปทำอะไรต่อได้นั้นเอง

    // return next.handle().pipe(
    //   map((data) => {
    //     return { data: data }; // ข้อมูลจะถูกหุ้มไว้ด้วย key ifel ใน data เขียนเป็น { data }; แบบนี้ก็ได้
    //   }),
    // ); // map ทำการเอาค่าออกมาได้

    return next.handle();
  }
}
