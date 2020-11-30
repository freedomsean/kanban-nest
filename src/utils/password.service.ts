import * as bcrypt from 'bcrypt';

export class PasswordService {
  /**
   * Compare password by bcrypt.
   *
   * @param {string} password - Password.
   * @param {string} hash - Hash.
   */
  static compareSecureHash(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  static generateSecureHash(password: string, rounds: number): string {
    const salt = bcrypt.genSaltSync(rounds);
    return bcrypt.hashSync(password, salt);
  }
}
