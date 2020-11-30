import { PassportService } from './passport.service';
import * as jwt from 'jsonwebtoken';

describe('Test PassportService', () => {
  describe('Test verify', () => {
    it('happy path', () => {
      const secret = 'abc';
      const payload = { subject: 'a', userId: 'a' };
      const token = jwt.sign(payload, secret);
      expect(PassportService.verify(token, secret).userId).toBe(payload.userId);
      expect(PassportService.verify(token, secret).subject).toBe(
        payload.subject,
      );
    });
  });
});
