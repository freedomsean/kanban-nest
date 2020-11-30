import * as jwt from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';

export class PassportService {
  static sign(
    payload: { id: string; username: string },
    secret: string,
    expiresIn: string,
  ): string {
    const options: jwt.SignOptions = { expiresIn, subject: payload.id };
    return jwt.sign(payload, secret, options);
  }

  static verify(token: string, secretOrKey: string): any {
    return jwt.verify(token, secretOrKey);
  }
}
