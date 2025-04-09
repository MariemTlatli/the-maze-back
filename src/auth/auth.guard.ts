import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers.authorization);
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) return false;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (typeof decoded === 'object' && 'code' in decoded) {
        return decoded.code === process.env.MIC_CODE;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
