import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    const validKey = this.configService.get<string>('API_KEY');

    if (!apiKey || apiKey !== validKey) {
      throw new UnauthorizedException('Invalid or missing API key');
    }

    next();
  }
}
