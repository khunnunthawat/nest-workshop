import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // console.log(req);
    next();
    // const { keyword } = req.query;
    // if (keyword) {
    //   req.timestamp = Date.now();
    //   next();
    // } else {
    //   throw new NotFoundException('keyword not found');
    // }
  }
}

// Middleware จะถูกเรียกก่อน Interceptors จะถูกเรียกใช้งานแทรกแซงข้อมูลอีกชั้นนึ่ง คล้ายๆเกี่ยวกับการเก็บ log
// Middleware จะได้แค่ Request อย่างเดียวจะ Response ส่งกลับเหมือน Interceptors ไม่ได้
// Interceptors จะมีความสามารถมากกว่า Middleware
// Interceptors สามารถ ส่ง Request และ ส่ง Response กลับมาได้
