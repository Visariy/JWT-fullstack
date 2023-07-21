import { Injectable, NestMiddleware } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { NextFunction } from "express";

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  async use(req: any, res: Response, next: NextFunction) {

    if(req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }

    next();
  }
}
